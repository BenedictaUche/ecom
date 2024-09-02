import React, { useEffect, useState } from "react";
import Navbar from "@/components/Home/Navbar";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Trash } from "lucide-react";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { NoDataCard } from "@/components/NoDataCard";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const calculateSubtotal = () => {
      const total = cartItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
      );
      setSubtotal(total);
      setIsLoading(false);
    };

    calculateSubtotal();
  }, [cartItems]);

  const handleDeleteItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleChangeRoute = () => {
    router.push("/products");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">My cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
              </div>
            ) : cartItems.length === 0 ? (
              <NoDataCard
                img="/images/no-data.png"
                header="No items in cart"
                message="You have not added any item"
                buttonText="Add to cart"
                handleClick={handleChangeRoute}
              />
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col md:flex-row items-center md:items-start justify-between border-b pb-4 mb-4"
                >
                  <div className="flex items-center md:w-1/2">
                    <div className="w-20 h-20 relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium">
                        {item.productName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ₦ {item.productPrice}
                      </p>
                      <p className="text-sm text-gray-500">Color: White</p>
                      <button className="text-sm text-blue-500">
                        More Details
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2">
                    <div className="flex items-center">
                      <button
                        className="border border-gray-300 px-2 py-1"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 text-center border border-gray-300"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="border border-gray-300 px-2 py-1"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-medium">
                      ₦ {(item.productPrice * item.quantity).toFixed(2)}
                    </p>
                    <Button onClick={() => handleDeleteItem(item.productId)}>
                      <Trash className="w-6 h-6 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-lg font-medium mb-4">Order summary</h2>
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimate Delivery</span>
                <span>Free</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-medium mb-4">
              <span>Total</span>
              <span>₦ {subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-black text-white rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
