import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
    { orderId: 'ORD001', customer: 'Liam Johnson', date: '2023-11-23', status: 'Delivered', total: '$250.00' },
    { orderId: 'ORD002', customer: 'Olivia Smith', date: '2023-11-22', status: 'Shipped', total: '$150.00' },
    { orderId: 'ORD003', customer: 'Noah Williams', date: '2023-11-21', status: 'Processing', total: '$350.00' },
    { orderId: 'ORD004', customer: 'Emma Brown', date: '2023-11-20', status: 'Delivered', total: '$450.00' },
    { orderId: 'ORD005', customer: 'Liam Johnson', date: '2023-11-19', status: 'Canceled', total: '$550.00' },
];

export default function AdminOrdersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your store's orders.</CardDescription>
        </div>
        <Button size="sm">
          <File className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={
                        order.status === 'Shipped' ? 'default' :
                        order.status === 'Processing' ? 'secondary' :
                        order.status === 'Delivered' ? 'outline' :
                        'destructive'
                      } className={order.status === 'Delivered' ? 'border-green-600 text-green-600' : ''}>
                        {order.status}
                      </Badge>
                </TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
