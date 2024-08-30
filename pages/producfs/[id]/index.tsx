import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Home/Navbar";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Product } from "@/lib/types/products";
import Footer from "@/components/Footer";
import CustomButton from "@/components/CustomButton";
import { addToCart } from "@/lib/cart";
import { Input } from "@/components/ui/input";
import Breadcrumb from "@/components/Breadcrumb";


const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productRef = doc(db, "products", id as string);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data() as Product);
        } else {
          console.error("No such product!");
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (
    productId: string,
    quantity: number,
    productName: string,
    productPrice: number,
    imageUrl: string
  ) => {
    setLoading(true);
    try {
      await addToCart(productId, quantity, productName, productPrice, imageUrl);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">

         <Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/products", label: "Products" }]} currentPage={
          product.name
         } />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-96">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-500 mb-2">SKU: {product.id}</p>
            <p className="text-2xl font-semibold mb-6">
            ₦ {product.price.toFixed(2)}
            </p>

            <div className="mb-4">
              <span className="block font-medium mb-1">Color: White</span>
              <div className="flex items-center">
                <span className="inline-block w-6 h-6 bg-white border border-gray-400 rounded-full"></span>
              </div>
            </div>

            {/* <div className="mb-4">
              <label htmlFor="size" className="block font-medium mb-1">Size</label>
              <select id="size" className="w-full border border-gray-400 py-2 px-4 rounded">
                {product.sizes.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div> */}

            <div className="mb-6">
              <label htmlFor="quantity" className="block font-medium mb-1">
                Quantity
              </label>
              <Input
                type="number"
                id="quantity"
                defaultValue={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-16 border border-gray-400 py-2 px-4 rounded"
              />
            </div>

            <div className="flex items-center gap-4">
              <CustomButton
                className="bg-black text-white py-2 px-4 rounded w-full hover:bg-black/50"
                isLoading={loading}
                disabled={loading}
                onClick={() =>
                  handleAddToCart(
                    product.id,
                    quantity,
                    product.name,
                    product.price,
                    product.imageUrl
                  )
                }
              >
                Add To Cart
              </CustomButton>

              <CustomButton className="border border-gray-400 text-gray-700 py-2 px-4 rounded w-full hover:bg-black/50">
                Buy Now
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">PRODUCT INFO</h3>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <h3 className="text-lg font-semibold mb-4">
            RETURN AND REFUND POLICY
          </h3>
          {/* <p className="text-gray-700">
            {product.returnPolicy}
          </p> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
