
'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getFarmerStatistics } from '@/lib/statistics';
import BackButton from '@/components/back-button';
import { DollarSign, ShoppingCart, Users, BarChart3, TrendingUp, Package, CalendarDays } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { Separator } from '@/components/ui/separator';

const COLORS = {
  Vegetal: 'hsl(var(--chart-1))',
  Fruta: 'hsl(var(--chart-2))',
  Laticínio: 'hsl(var(--chart-3))',
  Padaria: 'hsl(var(--chart-4))',
};

const chartConfigSales = {
  sales: {
    label: "Vendas (R$)",
    color: "hsl(var(--chart-1))",
  },
};

const chartConfigCategory = {
  value: {
    label: "Vendas",
  },
  Vegetal: {
    label: "Vegetais",
    color: "hsl(var(--chart-1))",
  },
  Fruta: {
    label: "Frutas",
    color: "hsl(var(--chart-2))",
  },
  Laticínio: {
    label: "Laticínios",
    color: "hsl(var(--chart-3))",
  },
  Padaria: {
    label: "Padaria",
    color: "hsl(var(--chart-4))",
  },
};


export default function StatisticsPage() {
    const { user } = useUser();
    
    const stats = useMemo(() => {
        if (user && user.id) {
            return getFarmerStatistics(user.id);
        }
        return null;
    }, [user]);

    if (!stats) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p>Carregando estatísticas...</p>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
             <div className="mb-4">
                <BackButton />
            </div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                    Estatísticas de Vendas
                </h1>
                <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl">Acompanhe o desempenho de suas vendas e entenda o comportamento dos seus clientes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-3xl font-headline">Receita Total</CardTitle>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {stats.totalRevenue.toFixed(2).replace('.', ',')}</div>
                        <p className="text-sm text-muted-foreground">de {stats.totalOrders} pedidos</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                         <div className="space-y-1">
                            <CardTitle className="text-3xl font-headline">Receita Mensal</CardTitle>
                             <p className="text-3xl font-bold text-accent capitalize">{stats.currentMonthName}</p>
                         </div>
                        <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {stats.currentMonthRevenue.toFixed(2).replace('.', ',')}</div>
                        <p className="text-sm text-muted-foreground">no mês atual</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-3xl font-headline">Ticket Médio</CardTitle>
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {stats.averageTicket.toFixed(2).replace('.', ',')}</div>
                        <p className="text-sm text-muted-foreground">por pedido</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-3xl font-headline">Clientes Únicos</CardTitle>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.uniqueCustomers}</div>
                        <p className="text-sm text-muted-foreground">que compraram de você</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-3xl font-headline">Produtos mais vendidos</CardTitle>
                        <Package className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {stats.topSellingProducts.length > 0 ? (
                           <ol className="text-base list-decimal list-inside text-muted-foreground space-y-1">
                             {stats.topSellingProducts.slice(0, 2).map(p => <li key={p.name}><span className="font-semibold text-foreground">{p.name}</span> ({p.quantity} un)</li>)}
                           </ol>
                        ) : (
                            <p className="text-sm text-muted-foreground">Nenhum produto vendido.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            
            <Separator className="my-8" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Vendas por Mês</CardTitle>
                        <CardDescription>Receita total gerada em cada mês do ano atual.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfigSales} className="min-h-[250px] w-full">
                            <BarChart accessibilityLayer data={stats.monthlySales}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                    tick={{ fill: 'hsl(var(--chart-2))', fontWeight: 'bold' }}
                                    interval={0}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Vendas por Categoria</CardTitle>
                        <CardDescription>Distribuição da receita entre as categorias de produtos.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                         <ChartContainer
                            config={chartConfigCategory}
                            className="mx-auto aspect-square max-h-[300px]"
                            >
                            <PieChart>
                                <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                data={stats.salesByCategory}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                strokeWidth={5}
                                >
                                {stats.salesByCategory.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
