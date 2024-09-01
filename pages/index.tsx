import { useEffect, useState } from "react";
import { Product } from "@/lib/types/products";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Hero from "@/components/Home/Hero";
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from "next/router";
import CartModal from "@/components/Modals/CartModal";
import { Skeleton } from "@/components/ui/skeleton";
import { NoDataCard } from "@/components/NoDataCard";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const route = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'products'));
        setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Product[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenCartModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenCartModal(true);
  };

  const handleDisplayProductDetails = (productId: string) => {
    route.push(`/producfs/${productId}`);
  };

  const handleChangeRoute = () => {
    route.push('/producfs');
  };

  const handleAddToCart = () => {
    route.push('/producfs/Collection');
  }

  return (
    <>
      <Hero />
      <div className="mx-auto py-8">
        <h2 className="text-3xl font-medium mb-8 text-center mt-8">
          New Arrivals
        </h2>

        <div>
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              <Button className="absolute left-0 z-10" onClick={() => scroll("left")}>
                <ArrowLeft size={24} />
              </Button>

              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-full flex gap-4 flex-shrink-0 cursor-pointer">
                      <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                      <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                      <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                      <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                      <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                      <Skeleton className="h-56 w-full bg-slate-300 rounded-[6px]" />
                    </div>
                  ))
                ) : products.length === 0 ? (
                  <NoDataCard
                    img='/images/no-data.png'
                    header='No products to show'
                    message='You have not added any product'
                    buttonText='Add Product'
                    handleClick={handleAddToCart}
                  />
                ) : (
                  products.map((product, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-64 h-64 relative" onClick={() => handleDisplayProductDetails(product.id)}>
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-[6px]"
                          />
                        </div>
                        <h3 className="text-lg mt-4">{product.name}</h3>
                        <p className="text-sm">₦ {product.price}</p>
                        <Button
                          className="mt-2 px-8 py-2 border border-black w-fit"
                          onClick={() => handleOpenCartModal(product)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Button className="absolute right-0 z-10" onClick={() => scroll("right")}>
                <ArrowRight size={24} />
              </Button>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button className="px-12 py-2 bg-black text-white w-fit hover:bg-black/50" onClick={handleChangeRoute}>
              Shop All
            </Button>
          </div>
        </div>

        <Footer />
      </div>
      {selectedProduct && (
        <CartModal
          title="Add to Cart"
          open={openCartModal}
          setOpen={setOpenCartModal}
          product={selectedProduct}
        />
      )}
    </>
  );

  function scroll(direction: "left" | "right") {
    const container = document.querySelector(".overflow-x-auto");

    if (container) {
      const scrollAmount = container.clientWidth / 3;

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }
};

export default HomePage;
