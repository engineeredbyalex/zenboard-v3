import { useEffect, useState } from "react";
import axios from "axios";
import BigStatsBox from "../boxes/BigStatsBox";

export default function Stats() {
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState([]);

    useEffect(() => {
        axios.get('/api/orders/orders').then(response => {
            setOrders(response.data);
        });

        axios.get('/api/categories/categories').then(result => {
            setCategories(result.data);
        });
    }, []);

    const calculateCategoryCounts = () => {
        const counts = {};

        orders.forEach(order => {
            order.line_items.forEach(item => {
                const categoryId = item.category;

                if (categoryId) {
                    if (counts[categoryId]) {
                        counts[categoryId]++;
                    } else {
                        counts[categoryId] = 1;
                    }
                }
            });
        });

        // Convert counts object to array of { categoryId, count } objects
        const countsArray = Object.entries(counts).map(([categoryId, count]) => ({ categoryId, count }));

        // Sort the array by count in descending order
        countsArray.sort((a, b) => b.count - a.count);

        // Set the top 3 categories or all categories if there are fewer than 3
        setCategoryCounts(countsArray.slice(0, 3));

        return counts;
    };

    useEffect(() => {
        calculateCategoryCounts();
    }, [orders, categories, calculateCategoryCounts]);

    return (
        <BigStatsBox title='' data={categories} >
        </BigStatsBox>
    );
}
