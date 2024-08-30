import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Home/Navbar';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import Footer from '@/components/Footer';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    setSubtotal(total);
  }, [cartItems]);

  const handleDeleteItem = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">My cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium">{item.productName}</h2>
                    <p className="text-sm text-gray-500">₦ {item.productPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Color: White</p>
                    <button className="text-sm text-blue-500">More Details</button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="border border-gray-300 px-2 py-1">-</button>
                  <input
                    type="text"
                    className="w-10 text-center border border-gray-300"
                    value={item.quantity}
                    readOnly
                  />
                  <button className="border border-gray-300 px-2 py-1">+</button>
                </div>
                <p className="text-lg font-medium">₦ {(item.productPrice * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleDeleteItem(item.productId)}>
                  <Trash className="w-6 h-6 text-red-500" />
                </button>
              </div>
            ))}
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
            <button className="w-full py-3 bg-black text-white rounded">Checkout</button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default CartPage;
