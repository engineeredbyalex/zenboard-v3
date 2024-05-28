import { Customization } from "@/models/Customization";
import { mongooseConnect } from "@/lib/mongoose";


export default async function handler(req, res) {
    try {
        console.log('Received request:', req.body);
        console.log('Properties:', req.body.properties);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    const {method} = req

    try { 
            await mongooseConnect()
        if (method === "GET") {
            if (req.query?.id) {
                        const customization = await Customization.findOne({_id:req.query.id})
                        if (!customization) {
                            return res.status(404).json({error :"Customization File not Found !"})
                }
                res.json(customization)
            }
            else {
                const customization = await Customization.find()
                res.json(customization)
            }
                }
        if (method === "POST") {
            const { bannerColor, mainColor, secodaryColor, bannerText, HeroImage, buttonColor } = req.body
            const customDoc = await Customization.create({ 
                bannerColor, mainColor, secodaryColor, bannerText, HeroImage, buttonColor
            })
            res.json(customDoc)
                }
        if (method === "PUT") {
                    
                }
        if (method === "DELETE") {
                    
                }
    }
    catch (error) { }
}