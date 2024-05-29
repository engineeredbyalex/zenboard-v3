import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

export default function TopSalesStats() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/orders/orders').then(response => {
            setOrders(response.data);
        });

        axios.get('/api/products/products').then(result => {
            setProducts(result.data);
        });
    }, []);

    const calculateProductCounts = () => {
        const productCounts = {};

        orders.forEach(order => {
            order.line_items.forEach(item => {
                const productId = item.productId;

                if (productId) {
                    if (productCounts[productId]) {
                        productCounts[productId]++;
                    } else {
                        productCounts[productId] = 1;
                    }
                }
            });
        });



        // Convert productCounts object to array of { productId, count } objects
        const countsArray = Object.entries(productCounts).map(([productId, count]) => ({ productId, count }));

        // Sort the array by count in descending order
        countsArray.sort((a, b) => b.count - a.count);

        // Set the top 3 products or all products if there are fewer than 3
        setTopProducts(countsArray.slice(0, 3));

        return countsArray;
    };

    useEffect(() => {
        calculateProductCounts();
    }, [orders, products]);

    return (
        <div className="box">
            <h4 className=" black_text font-medium uppercase">Top 3 most sold products</h4>
            <div className="gap-10 flex flex-col">
                {topProducts.map(({ productId, count }) => {
                    const product = products.find(product => product._id === productId);
                    return (
                       
                            <div className="text-center flex flex-col items-center justify-center" key={productId}>
                            <h5 className="white_text">Name: {product ? product.title : 'Unknown'}</h5>
                            <h5 className="white_text">Quanitity: {count}</h5>
                        </div>
                       
                    );
                })}
            </div>
        </div>
    );
}
