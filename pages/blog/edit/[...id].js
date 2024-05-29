import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "@/components/BlogForm";


export default function EditProductPage() {
    const [blogInfo, setBlogInfo] = useState(null);

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/blog?id=' + id).then(response => {
            setBlogInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h3 className="font-light uppercase grey_text w-full flex items-center justify-center">Edit the Blog Article</h3>

            {blogInfo && (
                <BlogForm {...blogInfo} />
            )}
        </Layout>
    );
}