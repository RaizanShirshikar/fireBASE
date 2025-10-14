"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, getCartTotal, getCartCount } = useCart();
  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 50 ? 0 : 10;
  const total = cartTotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="font-headline text-4xl">Your Cart is Empty</h1>
        <p className="text-muted-foreground mt-4">You can't check out with an empty cart.</p>
        <Button asChild className="mt-6">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="font-headline text-4xl md:text-5xl text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping and Payment Form */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Anytown" />
              </div>
              <div>
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" placeholder="CA" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP / Postal Code</Label>
                <Input id="zip" placeholder="12345" />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="USA" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Card Information</Label>
                <div className="mt-1 p-3 border rounded-md bg-muted/50 h-10">
                  {/* Placeholder for Stripe Card Element */}
                  <p className="text-sm text-muted-foreground">Stripe Card Element will be here.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary ({getCartCount()} items)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image src={item.image.src} alt={item.image.alt} data-ai-hint={item.image['data-ai-hint']} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm font-bold">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.variant?.name}</p>
                    </div>
                    <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          <Button asChild size="lg" className="w-full">
            <Link href="/order-confirmation">Place Order</Link>
          </Button>
           <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Secure payment powered by Stripe.
            </p>
        </div>
      </div>
    </div>
  );
}
