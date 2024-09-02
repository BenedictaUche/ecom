import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, AddPrefixToKeys } from 'firebase/firestore';
import Image from 'next/image';
import { Product } from '@/lib/types/products';
import { Skeleton } from '@/components/ui/skeleton';
import { NoDataCard } from '@/components/NoDataCard';
import { useRouter } from 'next/router';
import CustomButton from '@/components/CustomButton';
import { useToast } from '@/components/ui/use-toast';
import { addToCart } from '@/lib/cart';
import { Pen } from 'lucide-react';
import EditProductModal from '@/components/Modals/EditProductModal';

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [isNowLoading, setIsNowLoading] = useState(true);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsNowLoading(true);
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Product[];
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsNowLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = () => {
    let tempProducts = [...products];

    if (selectedPrice !== 'All') {
      tempProducts = tempProducts.filter(product => product.price <= parseFloat(selectedPrice));
    }

    setFilteredProducts(tempProducts);
  };

  const handleAddToCart = async (
    productId: string,
    quantity: number,
    productName: string,
    productPrice: number,
    imageUrl: string
  ) => {
    setLoading((prev) => ({ ...prev, [productId]: true }));
    try {
      await addToCart(productId, quantity, productName, productPrice, imageUrl);
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveEditProduct = async (updatedProduct: Product) => {
    try {
      const productRef = doc(db, 'products', updatedProduct.id);
      await updateDoc(productRef, updatedProduct as unknown as { [x: string]: any; } & AddPrefixToKeys<string, any>);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setIsModalOpen(false);
      toast({
        title: "Product Updated",
        description: `${updatedProduct.name} has been updated`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [selectedPrice, products]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div>
            <h2 className="text-lg font-medium mb-4">Filter by</h2>
            <div className="mb-4">
              <h3 className="text-sm font-medium">Price</h3>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md"
              >
                <option value="All">All</option>
                <option value="1000">₦ 1000 and below</option>
                <option value="2000">₦ 2000 and below</option>
                <option value="3000">₦ 3000 and below</option>
                <option value="500000">₦ 500,000 and below</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {isNowLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <Skeleton className='h-56 w-full bg-slate-300 rounded-md' />
                <Skeleton className='h-56 w-full bg-slate-300 rounded-md' />
                <Skeleton className='h-56 w-full bg-slate-300 rounded-md' />
                <Skeleton className='h-56 w-full bg-slate-300 rounded-md' />
              </div>
            ) : filteredProducts.length === 0 ? (
              <NoDataCard
                img='/images/no-data.png'
                header='No products to show'
                message='You have not added any product'
                buttonText='Add Product'
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="border p-4 rounded-md flex flex-col justify-between">
                    <div className="relative h-40 w-full">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <h2 className="mt-2 text-lg font-medium flex items-center gap-4">
                      {product.name}
                      <Pen
                        size={18}
                        className='cursor-pointer'
                        onClick={() => handleEditProduct(product)}
                      />
                    </h2>
                    <p className="text-gray-500">₦ {product.price}</p>
                    <CustomButton
                      className="mt-2 bg-black hover:bg-black/55 text-white w-full py-2 rounded-md"
                      onClick={() => handleAddToCart(product.id, 1, product.name, product.price, product.imageUrl)}
                      isLoading={loading[product.id] || false}
                      disabled={loading[product.id] || false}
                    >
                      Add to Cart
                    </CustomButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Edit Product Modal */}
      {selectedProduct && (
        <EditProductModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          product={selectedProduct}
          onSave={handleSaveEditProduct}
        />
      )}
    </>
  );
};

export default AllProducts;
