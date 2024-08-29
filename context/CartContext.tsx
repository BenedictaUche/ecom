import React, { createContext, useContext, useState, useEffect } from 'react';
import { addToCart as addToCartFirebase, getCartItems as getCartItemsFirebase } from '@/lib/cart';

interface CartItem {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number, productName: string, productPrice: number) => void;
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

  const addToCart = async (productId: string, quantity: number, productName: string, productPrice: number) => {
    await addToCartFirebase(productId, quantity, productName, productPrice);
    const updatedItems = await getCartItemsFirebase();
    setCartItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
