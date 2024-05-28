import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
    try {
        console.log('Received request:', req.body);
        console.log('Properties:', req.body.properties);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    const { method } = req;

    try {
        await mongooseConnect();

        if (method === "GET") {
            if (req.query?.id) {
                const blog = await Blog.findOne({ _id: req.query.id });
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                res.json(blog);
            } else {
                const blog = await Blog.find();
                res.json(blog);
            }
        }

        if (method === "POST") {
            const { title, properties, _id } = req.body;
            const blogDoc = await Blog.create({
                title,
                properties: properties.map(prop => ({ name: prop.name, values: prop.values })),
            });
            res.json(blogDoc);
        }

        if (method === "PUT") {
            const { title, properties,_id } = req.body;
            const blogDoc = await Blog.findOne({ _id });
            if (!blogDoc) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            await blogDoc.updateOne({
                title,
                properties: properties.map(prop => ({ name: prop.name, values: prop.values })),
            });
            res.json(true);
        }

        if (method === "DELETE") {
            if (req.query?.id) {
                const result = await Blog.deleteOne({ _id: req.query.id });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                res.json(true);
            }
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
