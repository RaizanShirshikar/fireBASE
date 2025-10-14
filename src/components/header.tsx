"use client";

import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { CartSheet } from "@/components/cart-sheet";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState, useMemo } from "react";

const mainNav = [
  { href: "/category/womens-fashion", label: "Women" },
  { href: "/category/mens-fashion", label: "Men" },
  { href: "/category/accessories", label: "Accessories" },
  { href: "/category/footwear", label: "Footwear" },
];

export function Header() {
  const { cartItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="mb-4">
                <Logo />
              </Link>
              {mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>

          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {isClient && cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {cartCount}
                  </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
