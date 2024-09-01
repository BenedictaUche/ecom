import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Product } from "@/lib/types/products";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import CustomButton from "../CustomButton";
import { useToast } from "../ui/use-toast";

type ModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
};

const CartModal = ({
  title,
  open,
  setOpen,
  className,
  product,
}: ModalProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    await addToCart(product.id, quantity, product.name, product.price, product.imageUrl);
    setIsLoading(false);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      variant: "default",
    });
    setOpen(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl p-4">
        <DialogHeader>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col space-y-8 w-1/2">
              <div className="flex flex-col items-start space-y-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-lg text-gray-500">₦ {product.price}</p>
              </div>
              <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-4">
                  <span className="text-lg">Quantity:</span>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 border border-gray-300 p-2 text-center rounded-md"
                  />
                </div>
              </div>
              <CustomButton
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-black/55"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Add to Cart
              </CustomButton>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
