import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";

export default function NewProduct() {
    return (
        <Layout>
            <h1 className="font-bold uppercase">New Products</h1>
            <ProductForm />
        </Layout>
    );
}