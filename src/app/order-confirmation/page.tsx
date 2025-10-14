import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="font-headline text-3xl mt-4">
            Thank You For Your Order!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your order #123456 has been placed successfully. You will receive an
            email confirmation shortly.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="ml-4">
              <Link href="/account">View Order Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
