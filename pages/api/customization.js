import { Customization } from "@/models/Customization";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    const { method } = req;

    try {
        await mongooseConnect();
        if (method === "GET") {
            if (req.query?.id) {
                const customization = await Customization.findOne({ _id: req.query.id });
                if (!customization) {
                    return res.status(404).json({ error: "Customization File not Found!" });
                }
                res.json(customization);
            } else {
                const customizations = await Customization.find();
                res.json(customizations);
            }
        }
        if (method === "POST") {
            const {
                bannerText, bannerColor, mainColor, secondaryColor, heroImage, accentColor,
                fontFamily, fontSize, textColor, buttonColor, buttonText,
                logoImage, backgroundImage, metaTitle, metaDescription, metaKeywords,
                facebookLink, twitterLink, instagramLink, footerText, customCSS
            } = req.body;
            const customDoc = await Customization.create({
                bannerText, bannerColor, mainColor, secondaryColor, heroImage, accentColor,
                fontFamily, fontSize, textColor, buttonColor, buttonText,
                logoImage, backgroundImage, metaTitle, metaDescription, metaKeywords,
                facebookLink, twitterLink, instagramLink, footerText, customCSS
            });
            res.json(customDoc);
        }
        if (method === "PUT") {
            const {
                _id, bannerText, bannerColor, mainColor, secondaryColor, heroImage, accentColor,
                fontFamily, fontSize, textColor, buttonColor, buttonText,
                logoImage, backgroundImage, metaTitle, metaDescription, metaKeywords,
                facebookLink, twitterLink, instagramLink, footerText, customCSS
            } = req.body;
            const updatedDoc = await Customization.findByIdAndUpdate(_id, {
                bannerText, bannerColor, mainColor, secondaryColor, heroImage, accentColor,
                fontFamily, fontSize, textColor, buttonColor, buttonText,
                logoImage, backgroundImage, metaTitle, metaDescription, metaKeywords,
                facebookLink, twitterLink, instagramLink, footerText, customCSS
            }, { new: true });
            res.json(updatedDoc);
        }
        if (method === "DELETE") {
            if (req.query?.id) {
                await Customization.deleteOne({ _id: req.query.id });
                res.json({ message: 'Customization deleted' });
            } else {
                res.status(400).json({ error: 'ID is required for deletion' });
            }
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
