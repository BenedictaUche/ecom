import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "@/lib/firebase"; // Ensure you have configured Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { Product } from "@/lib/types/products";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { addProductSchema } from "@/lib/formSchema";
import { useToast } from "../ui/use-toast";
import FormRender from "./FormRender";

interface ProductFormProps {
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      //   category: product?.category || "",
      //   quantity: product?.quantity || 0,
      image: product?.imageUrl || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addProductSchema>) => {
    try {
      let imageUrl = values.image;

      if (imageFile) {
        const storageRef = ref(storage, `products/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const productData = {
        ...values,
        imageUrl,
      };

      if (product) {
        const productRef = doc(db, "products", product.id);
        await updateDoc(productRef, productData);
        toast({ title: "Product updated successfully!" });
      } else {
        await addDoc(collection(db, "products"), productData);
        toast({ title: "Product added successfully!" });
      }

      router.push("/collection");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormRender
              placeholder="Input your name"
              field={field}
              label="Name"
              classNameLabel=""
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormRender
              placeholder="Enter your product description"
              field={field}
              label="Description"
              classNameLabel=""
            />
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormRender
              placeholder="Enter a price"
              field={field}
              label="Price"
              classNameLabel=""
            />
          )}
        />

        <div>
          <FormLabel>Image</FormLabel>
          <input
            type="file"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <Button type="submit" className="bg-black hover:bg-black/55 text-white">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
