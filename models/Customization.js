import { model, models, Schema } from "mongoose";

const CustomizationSchema = new Schema({
    bannerText: { type: String, required: false },
    bannerColor: { type: String, required: false },
    mainColor: { type: String, required: false },
    secondaryColor: { type: String, required: false },
    heroImage: { type: String, required: false },
    accentColor: { type: String, required: false },
    fontFamily: { type: String, required: false },
    fontSize: { type: String, required: false },
    textColor: { type: String, required: false },
    buttonColor: { type: String, required: false },
    buttonText: { type: String, required: false },
    logoImage: { type: String, required: false },
    backgroundImage: { type: String, required: false },
    metaTitle: { type: String, required: false },
    metaDescription: { type: String, required: false },
    metaKeywords: { type: String, required: false },
    facebookLink: { type: String, required: false },
    twitterLink: { type: String, required: false },
    instagramLink: { type: String, required: false },
    footerText: { type: String, required: false },
    customCSS: { type: String, required: false },
});

export const Customization = models?.Customization || model('Customization', CustomizationSchema);
