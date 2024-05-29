import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";


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
        const product = await Product.findOne({ _id: req.query.id });
        res.json(product);
      } else {
        const products = await Product.find();
        res.json(products);
      }
    }

    if (method === "POST") {
      const { title, description, price, newPrice ,images, category, properties } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
        newPrice,
        images,
        category,
        properties: properties.map(prop => ({ name: prop.name, values: prop.values })),
      });
      res.json(productDoc);
    }

    if (method === "PUT") {
      const { title, description, price, newPrice,images, category, properties, _id } = req.body;
      await Product.updateOne(
        { _id },
        {
          title,
          description,
          price,
          newPrice,
          images,
          category,
          properties: properties.map(prop => ({ name: prop.name, values: prop.values })),
        }
      );
      res.json(true);
    }

    if (method === "DELETE") {
      if (req.query?.id) {
        await Product.deleteOne({ _id: req.query?.id });
        res.json(true);
      }
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
