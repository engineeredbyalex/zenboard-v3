import axios from "axios";
import { useEffect, useState } from "react";
import BigStatsBox from "../boxes/BigStatsBox";

export default function CityStats() {
    const [orders, setOrders] = useState([]);
    const [topCities, setTopCities] = useState([]);

    useEffect(() => {
        axios.get('/api/orders/orders').then(response => {
            setOrders(response.data);
        });
    }, []);

    const calculateCityCounts = () => {
        const cityCounts = {};

        orders.forEach(order => {
            const city = order.city;

            if (city) {
                if (cityCounts[city]) {
                    cityCounts[city]++;
                } else {
                    cityCounts[city] = 1;
                }
            }
        });
        const countsArray = Object.entries(cityCounts).map(([city, count]) => ({ city, count }));
        countsArray.sort((a, b) => b.count - a.count);
        setTopCities(countsArray.slice(0, 3));

        return countsArray;
    };

    useEffect(() => {
        calculateCityCounts();
    }, [orders]);

    return (
        <BigStatsBox title="title">
            {topCities.map(({ city, count }) => (
                <div key={city}>
                    <h5 className="grey_text">City: {city}</h5>
                    <h5 className="grey_text ">Number of orders: {count}</h5>
                </div>
            ))}
        </BigStatsBox>
    );
}
