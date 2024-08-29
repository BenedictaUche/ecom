import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Product } from '@/lib/types/products';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
}


const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = product?.imageUrl || '';

    if (imageFile) {
      const storageRef = ref(storage, `products/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const productData = {
      name,
      description,
      price,
      imageUrl,
    };

    if (product) {
      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, productData);
    } else {
      await addDoc(collection(db, 'products'), productData);
    }

    // onClose();
    // router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Image</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      <button type="submit">{product ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
