import { getOrders } from "@/lib/data";
import type { Order } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

export default function DashboardPage() {
    const orders = getOrders();

    const getStatusVariant = (status: Order['status']) => {
        switch (status) {
            case 'Pending':
                return 'secondary';
            case 'Confirmed':
                return 'default';
            case 'Rejected':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold font-headline text-primary mb-6">Farmer Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Incoming Orders</CardTitle>
                    <CardDescription>Review and manage new orders from your customers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customerName}</TableCell>
                                    <TableCell>
                                        {order.items.map(item => `${item.productName} (x${item.quantity})`).join(', ')}
                                    </TableCell>
                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {order.status === 'Pending' && (
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Accept
                                                </Button>
                                                <Button size="sm" variant="destructive_outline">
                                                    <XCircle className="h-4 w-4 mr-2" />
                                                    Decline
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
