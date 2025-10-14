"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/data";
import { ArrowRight, ShoppingBag } from "lucide-react";
import heroImageData from "@/lib/placeholder-images.json";

export default function Home() {
  const featuredProducts = products.filter((p) => p.tags.includes("featured"));
  const heroImage = heroImageData.placeholderImages.find(
    (img) => img.id === "hero-1"
  );

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-7xl lg:text-8xl tracking-tighter drop-shadow-lg">
            Elegance in Every Thread
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200 drop-shadow">
            Discover our new collection of curated fashion, designed for the
            modern connoisseur.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/category/all">Shop New Arrivals</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/category/all">Explore Collections</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-headline text-3xl md:text-4xl">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-2">
            Handpicked selections just for you
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {featuredProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-headline text-3xl md:text-4xl">
            Shop by Category
          </h2>
          <p className="text-muted-foreground mt-2">
            Find what you're looking for with ease
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="overflow-hidden group relative">
                <CardContent className="p-0">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    data-ai-hint={category.image["data-ai-hint"]}
                    width={400}
                    height={500}
                    className="object-cover w-full h-80 transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-headline text-2xl text-white">
                      {category.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Strip */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <h3 className="font-headline text-2xl md:text-3xl">
              Join The Club
            </h3>
            <p className="opacity-80">
              Sign up for our newsletter and get 20% off your first order.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            className="font-bold text-secondary-foreground"
          >
            <Link href="/account">
              Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
