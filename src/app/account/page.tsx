import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="font-headline text-4xl md:text-5xl mb-8">My Account</h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="details">Account Details</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">You have no past orders.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="addresses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Addresses</CardTitle>
                <CardDescription>
                  Manage your shipping and billing addresses.
                </CardDescription>
              </div>
              <Button>Add New Address</Button>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">You have no saved addresses.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your saved payment methods.
                </CardDescription>
              </div>
              <Button>Add New Card</Button>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">You have no saved payment methods.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Form for account details would go here */}
              <p className="text-muted-foreground text-center py-12">
                Account details form placeholder.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
