import { model, models, Schema } from "mongoose"

const CustomizationSchema = new Schema({
    bannerColor:{type:String},
    mainColor:{type:String},
    secondaryColor:{type:String},
    bannerText:{type:String},
    heroImage: { type: String },
    buttonsColor:{type:String},
}, {
    timestamps:true
})

export const Customization = models?.Customization || model('Customization',CustomizationSchema)