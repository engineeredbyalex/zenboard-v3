// importing Layout
import Layout from "@/components/Layout";
// importing useEffect and useState
import { useEffect, useState } from "react";
// importing axios
import axios from "axios";
// importing link
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders/orders').then(response => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/products/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  const getProductDetails = (productId) => {
    const product = products.find(product => product._id === productId);
    return product || {};
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
             <h4 className="uppercase font-bold text-black  b-4 ">Orders</h4>
        </div>
        <div className="mb-10 flex flex-col items-center justify-center">
          <h4 className="uppercase text-gray-600 mb-10">Stripe</h4>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-5">
            <button className="bg-black p-2 rounded-lg text-white w-[15rem]">
              <Link target="_blank" href={'https://dashboard.stripe.com/payments'}>See Stripe Orders</Link>
            </button>
            <button className="bg-black p-2 rounded-lg text-white w-[15rem]">
              <Link href={'https://dashboard.stripe.com/balance/overview'}>See Stripe Balance</Link>
            </button>
            <button className="bg-black p-2 rounded-lg text-white w-[15rem]">
              <Link href={'https://dashboard.stripe.com/customers'}>See Stripe Clients</Link>
            </button>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            orders.map((order, index) => (
              <div key={order._id} className={`bg-gray-${index % 2 === 0 ? 100 : 200} p-4 mb-4 flex flex-col`}>
                <div className="mb-4">
                  <p>Date: {(new Date(order.createdAt)).toLocaleString()}</p>
                  <p className={order.paid ? 'text-green-600' : 'text-red-600'}>Payment Status: {order.paid ? 'Yes' : 'No'}</p>
                  <div>
                    <p>Name: {order.name}</p>
                    <p>Email Address: {order.email}</p>
                    <p>Phone Number: {order.phone}</p>
                    <p>City: {order.city}</p>
                    <p>Postal Code: {order.postalCode}</p>
                    <p>County: {order.country}</p>
                    <p>Address: {order.streetAddress}</p>
                  </div>
                </div>
                <div>
                  {order.line_items.map((lineItem, index) => {
                    const productDetails = getProductDetails(lineItem.productId);
                    return (
                      <div key={index} className="border border-black p-2 mb-2">
                        <p>Product Name: {productDetails.title}</p>
                        <p>Quantity: {lineItem.quantity}</p>
                        {lineItem.selectedValues && lineItem.selectedValues.length > 0 ? (
                          lineItem.selectedValues.map((selectedValue, index) => (
                            <p key={index}>Option {index + 1}: {selectedValue.value}</p>
                          ))
                        ) : (
                          <p>No selected values</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
