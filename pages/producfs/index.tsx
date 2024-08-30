import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { Product } from '@/lib/types/products';
import { Skeleton } from '@/components/ui/skeleton';
import { NoDataCard } from '@/components/NoDataCard';
import { useRouter } from 'next/router';

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Product[];
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = () => {
    let tempProducts = [...products];

    if (selectedPrice !== 'All') {
      // Filter by price
      tempProducts = tempProducts.filter(product => product.price <= parseFloat(selectedPrice));
    }

    // Uncomment and adjust this block when the 'size' filter is needed
    // if (selectedSize !== 'All') {
    //   // Filter by size
    //   tempProducts = tempProducts.filter(product => product.size.includes(selectedSize));
    // }

    setFilteredProducts(tempProducts);
  };

  const handleChangeRoute = () => {
    router.push('/add-product');
  };

  useEffect(() => {
    handleFilter();
  }, [selectedPrice, selectedSize, products]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar for Filters */}
          <div>
            <h2 className="text-lg font-medium mb-4">Filter by</h2>
            <div className="mb-4">
              <h3 className="text-sm font-medium">Price</h3>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="mt-1 block w-full border-gray-300"
              >
                <option value="All">All</option>
                <option value="1000">₦ 1000 and below</option>
                <option value="2000">₦ 2000 and below</option>
                <option value="3000">₦ 3000 and below</option>
                <option value="500000">₦ 500,000 and below</option>
              </select>
            </div>
          </div>

          <div className="col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <Skeleton className='h-56 w-full bg-slate-300 rounded-[6px]' />
                <Skeleton className='h-56 w-full bg-slate-300 rounded-[6px]' />
                <Skeleton className='h-56 w-full bg-slate-300 rounded-[6px]' />
                <Skeleton className='h-56 w-full bg-slate-300 rounded-[6px]' />
              </div>
            ) : filteredProducts.length === 0 ? (
              <NoDataCard
                img='/images/no-data.png'
                header='No products to show'
                message='You have not added any product'
                buttonText='Add Product'
                handleClick={handleChangeRoute}
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="border p-4">
                    <div className="relative h-40 w-full">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <h2 className="mt-2 text-lg font-medium">{product.name}</h2>
                    <p className="text-gray-500">₦ {product.price.toFixed(2)}</p>
                    <button className="mt-2 bg-black text-white w-full py-2">Add to Cart</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
