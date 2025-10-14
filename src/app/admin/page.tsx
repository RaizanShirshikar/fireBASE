import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";
import { Overview } from "./components/overview";

const kpiData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Sales",
    value: "+1,234",
    change: "+18.1% from last month",
    icon: ShoppingBag,
  },
  {
    title: "New Customers",
    value: "+316",
    change: "+12.2% from last month",
    icon: Users,
  },
  {
    title: "Active Now",
    value: "573",
    change: "Online",
    icon: Activity,
  },
];

const recentOrders = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "$42.50",
    status: "Shipped",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "$129.00",
    status: "Processing",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "$78.90",
    status: "Shipped",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "$299.99",
    status: "Delivered",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "$39.00",
    status: "Canceled",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.email}>
                    <TableCell>
                      <div className="font-medium">{order.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.email}
                      </div>
                    </TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === 'Shipped' ? 'default' :
                        order.status === 'Processing' ? 'secondary' :
                        order.status === 'Delivered' ? 'outline' : // Using outline for a "success" like state
                        'destructive'
                      } className={order.status === 'Delivered' ? 'border-green-600 text-green-600' : ''}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
