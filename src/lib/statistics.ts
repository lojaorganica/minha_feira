
import { getOrders, getProducts, getFarmerById } from './data';
import type { Order, Product } from './types';

// Função para formatar o mês a partir de uma data
const getMonthName = (date: Date) => {
    return date.toLocaleString('pt-BR', { month: 'long' });
};

export function getFarmerStatistics(farmerId: string) {
    const allProducts = getProducts();
    const allOrders = getOrders();
    const farmer = getFarmerById(farmerId);

    // Mapeia o ID do produto para sua categoria
    const productCategoryMap = new Map<string, string>();
    allProducts.forEach(p => productCategoryMap.set(p.name, p.category));

    // Filtra os produtos e pedidos apenas para o agricultor logado
    const farmerProducts = allProducts.filter(p => p.farmerId === farmerId);
    const farmerProductNames = new Set(farmerProducts.map(p => p.name));

    // Filtra os pedidos para incluir apenas aqueles que contêm pelo menos um produto do agricultor.
    // Isso é uma simplificação, assumindo que um pedido é "do agricultor" se contiver um de seus produtos.
    // Em uma aplicação real, o pedido teria uma referência direta ao farmerId.
    const farmerOrders = allOrders.filter(order =>
        order.items.some(item => farmerProductNames.has(item.productName))
    );

    // 1. Receita Total
    const totalRevenue = farmerOrders.reduce((sum, order) => sum + order.total, 0);

    // 2. Total de Pedidos
    const totalOrders = farmerOrders.length;
    
    // 3. Ticket Médio
    const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // 4. Clientes Únicos
    const uniqueCustomers = new Set(farmerOrders.map(order => order.customerName)).size;

    // 5. Vendas Mensais (para o ano atual)
    const monthlySalesData: { [key: string]: number } = {};
    const currentYear = new Date().getFullYear();

    farmerOrders.forEach(order => {
        const orderYear = new Date(order.date).getFullYear();
        if (orderYear === currentYear) {
            const month = getMonthName(new Date(order.date));
            if (!monthlySalesData[month]) {
                monthlySalesData[month] = 0;
            }
            monthlySalesData[month] += order.total;
        }
    });

    const monthOrder = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    
    const monthlySales = monthOrder.map(month => ({
        month: month.charAt(0).toUpperCase() + month.slice(1),
        sales: monthlySalesData[month] || 0,
    })).filter(m => m.sales > 0); // Mostra apenas meses com vendas

    // 6. Vendas por Categoria
    const salesByCategoryData: { [key: string]: number } = { 'Vegetal': 0, 'Fruta': 0, 'Laticínio': 0, 'Padaria': 0 };
    farmerOrders.forEach(order => {
        order.items.forEach(item => {
            if (farmerProductNames.has(item.productName)) {
                const category = productCategoryMap.get(item.productName);
                const product = allProducts.find(p => p.name === item.productName);
                if (category && product) {
                    const itemValue = product.price * item.quantity;
                    salesByCategoryData[category] += itemValue;
                }
            }
        });
    });

    const salesByCategory = Object.entries(salesByCategoryData)
        .map(([name, value]) => ({ name, value }))
        .filter(cat => cat.value > 0);

    // 7. Produtos mais vendidos
    const productSalesCount: { [key: string]: number } = {};
    farmerOrders.forEach(order => {
        order.items.forEach(item => {
            if (farmerProductNames.has(item.productName)) {
                if (!productSalesCount[item.productName]) {
                    productSalesCount[item.productName] = 0;
                }
                productSalesCount[item.productName] += item.quantity;
            }
        });
    });
    
    const topSellingProducts = Object.entries(productSalesCount)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5); // Top 5 produtos


    return {
        totalRevenue,
        totalOrders,
        averageTicket,
        uniqueCustomers,
        monthlySales,
        salesByCategory,
        topSellingProducts,
    };
}
