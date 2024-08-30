import React, { createContext, useContext, useState, useEffect } from 'react';
import { addToCart as addToCartFirebase, getCartItems as getCartItemsFirebase } from '@/lib/cart';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CartItem {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  imageUrl: string
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number, productName: string, productPrice: number, imageUrl: string) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItemsFirebase();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);


  const addToCart = async (productId: string, quantity: number, productName: string, productPrice: number, imageUrl: string) => {
    await addToCartFirebase(productId, quantity, productName, productPrice, imageUrl);
    const updatedItems = await getCartItemsFirebase();
    setCartItems(updatedItems);
  };

  const removeFromCart = async (productId: string) => {
    try {
      const updatedCart = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedCart);
      const cartRef = doc(db, 'carts');

      await updateDoc(cartRef, { items: updatedCart });
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
