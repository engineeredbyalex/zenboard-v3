import { useEffect, useState } from "react";
import axios from "axios";
import { subHours } from "date-fns";
import StatsBox from "./boxes/StatsBox";
import TopSalesStats from "./stats/TopSalesStats";
import CityStats from "./stats/CityStats";
import CategoryStats from "./stats/CategoryStats";


function HomeStats() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/api/orders/orders").then((res) => {
            setOrders(res.data);
        });

        axios.get("/api/products/products").then((res) => {
            setProducts(res.data);
        });
    }, []);



    function getProductPrice(productId) {
        const product = products.find((p) => p._id === productId);
        return product ? product.price : 0;
    }

    function revenueTotal(order) {
        let sum = 0;
        for (const itemId in order.line_items) {
            const item = order.line_items[itemId];
            const productId = item.productId;
            const quantity = item.quantity;
            const productPrice = getProductPrice(productId);
            sum += quantity * productPrice;
        }
        return sum;
    }

    function totalOrdersRevenue() {
        let totalRevenue = 0;
        orders.forEach((order) => {
            totalRevenue += revenueTotal(order);
        });
        return totalRevenue;
    }
    function percentageIncreaseThisMonth() {
        const currentDate = new Date();
        const ordersThisMonth = orders.filter((o) => new Date(o.createdAt) > subHours(currentDate, 24 * 30));
        const totalRevenueThisMonth = ordersThisMonth.reduce((sum, order) => sum + revenueTotal(order), 0);
        const previousMonthRevenue = orders.filter((o) => new Date(o.createdAt) > subHours(currentDate, 24 * 60)).reduce((sum, order) => sum + revenueTotal(order), 0);
        const percentageIncrease = ((totalRevenueThisMonth - previousMonthRevenue) / previousMonthRevenue) * 100;
        return percentageIncrease.toFixed(2); 
    }
    function percentageIncreaseThisWeek() {
        const ordersThisWeek = orders.filter((o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7));
        const totalRevenueThisWeek = ordersThisWeek.reduce((sum, order) => sum + revenueTotal(order), 0);
        const previousWeekRevenue = orders.filter((o) => new Date(o.createdAt) > subHours(new Date(), 24 * 14)).reduce((sum, order) => sum + revenueTotal(order), 0);
        const percentageIncrease = ((totalRevenueThisWeek - previousWeekRevenue) / previousWeekRevenue) * 100;
        return percentageIncrease.toFixed(2); 
    }
    function totalOrder() {
        let totalOrder = 0
        orders.forEach((order) => {
            totalOrder++
        })
        return totalOrder
    }
    function ordersThisMonth() {
        const currentDate = new Date();
        return orders.filter(
            (o) => new Date(o.createdAt) > subHours(currentDate, 24 * 30)
        );
    }

    function ordersThisWeek() {
        const currentDate = new Date();
        return orders.filter(
            (o) => new Date(o.createdAt) > subHours(currentDate, 24 * 7)
        );
    }
    return (
        <div className=" h-auto w-full flex flex-col items-center justify-center gap-5">
            <div className="flex gap-5 lg:flex-row flex-col items-center justify-evenly overflow-x-hidden h-auto w-full py-5">
                <StatsBox
                    title="Total made"
                    value={totalOrdersRevenue()}
                    percent_value={percentageIncreaseThisMonth()}
                    value_week={percentageIncreaseThisWeek()} />
                <StatsBox
                    title="Total Orders"
                    value={totalOrder()}
                    percent_value={ordersThisMonth().length}
                    value_week={ordersThisWeek().length}
                />
            </div>
            <div className="flex lg:flex-row flex-col items-center justify-evenly h-auto w-full gap-5  overflow-x-hidden py-5">
                <TopSalesStats />
                {/* <CityStats /> */}
                {/* <CategoryStats /> */}
            </div>
        </div>
    );
}

export default HomeStats;
