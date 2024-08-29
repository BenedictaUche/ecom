import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-full mt-6">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {[{imageSrc: '/images/child_sitting.jpg'}, {imageSrc: '/images/kid_sitting.jpg'}, {imageSrc: '/images/child_sitting.jpg'}].map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="relative">
                  <img
                    src={slide.imageSrc}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto max-h-[500px] object-cover "
                  />
                  <CardContent className="absolute bottom-0 top-0 left-0 right-0 flex flex-col items-center justify-center p-6 bg-opacity-50 bg-white">
                    <h2 className="text-4xl text-gray-800">NEW COLLECTION</h2>
                    <button className="mt-4 px-6 py-2 bg-black text-white">Shop Now</button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl" />
        </Carousel>
        {/* <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div> */}
      </div>
    </>
  );
};

export default Hero;
