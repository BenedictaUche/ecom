import React from "react";
import { useCart } from "@/context/CartContext";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Product } from "@/lib/types/products";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import CustomButton from "../CustomButton";

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

  const handleAddToCart = () => {
    addToCart(product.id, 1, product.name, product.price, product.imageUrl);
    setOpen(false);
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
                <p className="text-lg text-gray-500">
                ₦ {product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col space-y-8">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Color:</span>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-gray-200"></div>
                    <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-gray-200"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-gray-500">Size:</span>
                  <select className="border border-gray-300 rounded-md p-2 w-full">
                    <option>Select</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="text-lg">Quantity:</span>
                  <Input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-12 border border-gray-300 p-2 text-center rounded-md"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-black/55"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
