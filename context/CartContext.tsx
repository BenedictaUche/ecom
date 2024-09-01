import React, { createContext, useContext, useState, useEffect } from 'react';
import { addToCart as addToCartFirebase, getCartItems as getCartItemsFirebase } from '@/lib/cart';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getCartId } from '@/lib/localStorage';

interface CartItem {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  imageUrl: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number, productName: string, productPrice: number, imageUrl: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
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
      const cartId = getCartId();

      if (!cartId) {
        throw new Error("Cart ID is undefined or null.");
      }

      const updatedCart = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedCart);

      const cartRef = doc(db, 'cart', cartId);
      await setDoc(cartRef, { items: updatedCart }, { merge: true });

    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  const updateCartItemQuantity = async (productId: string, newQuantity: number) => {
    try {
      const cartId = getCartId();

      if (!cartId) {
        throw new Error("Cart ID is undefined or null.");
      }

      const updatedCartItems = cartItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCartItems);

      const cartRef = doc(db, 'cart', cartId);
      await updateDoc(cartRef, { items: updatedCartItems });

    } catch (error) {
      console.error("Error updating item quantity: ", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
