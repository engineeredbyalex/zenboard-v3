
import Layout from "@/components/Layout";
import BlogForm from "@/components/BlogForm";

export default function NewProduct() {
    return (
        <Layout>
            <h5 className="uppercase grey_text border-b">New Article</h5>
            <BlogForm />
        </Layout>
    );
}