import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";


export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products/products?id=' + id).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h3 className="font-light uppercase grey_text w-full flex items-center justify-center">Edit the Product</h3>
    
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    );
}