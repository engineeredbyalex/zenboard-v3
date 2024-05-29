import Layout from '@/components/Layout';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios';


function Blog() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        axios.get('/api/blog').then(response => {
            setArticles(response.data);
        });
    }, []);
    return (
        <Layout>
            <h3 className="uppercase grey_text">Blog</h3>
            <div className="flex gap-10">
                <Link className="btn-primary uppercase font-bold" href={'/blog/new'}>Create a new blog post</Link>
            </div>
            <table className="basic mt-2">
                <h5 className="uppercase grey_text border-b">Blog posts</h5>
                <tbody>
                    {articles.map(article => (
                        <tr key={article._id}>
                            <td>
                                <p className="font-normla uppercase dark_blue_text">
                                    {article.title}
                                </p>
                            </td>
                            <td>
                                <Link className="btn-primary" href={'/blog/edit/' + article._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Editează
                                </Link>
                                <Link className="btn-red" href={'/blog/delete/' + article._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    Șterge
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Blog