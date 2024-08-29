import { doc, setDoc, updateDoc, arrayUnion, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// to add a product to the cart
export const addToCart = async (productId: string, quantity: number, productName: string, productPrice: number) => {
  const cartRef = doc(db, 'cart', 'cartId');
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const existingCart = cartSnap.data();

    // Check if the product is already in the cart
    const existingItem = existingCart.items.find((item: any) => item.productId === productId);

    if (existingItem) {
      // Update quantity of the existing item
      existingItem.quantity += quantity;
      await setDoc(cartRef, existingCart);
    } else {
      // Add new item to the cart
      await updateDoc(cartRef, {
        items: arrayUnion({ productId, quantity, productName, productPrice }),
      });
    }
  } else {
    // create new cart
    await setDoc(cartRef, {
      items: [{ productId, quantity, productName, productPrice }],
    });
  }
};

// retrieve cart items
export const getCartItems = async () => {
  const cartId = "cartId";
  const cartRef = doc(db, 'cart', cartId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    return cartSnap.data()?.items || [];
  } else {
    return [];
  }
};
