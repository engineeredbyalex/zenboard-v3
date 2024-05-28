import { model, models, Schema } from "mongoose";

const PropertySchema = new Schema({
    name: { type: String, required: true },
    values: [{ type: String }],
    images: [{ type: Object }] // Updated to store images for each property
});

const blogSchema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String },
        properties: [PropertySchema],
    },
    {
        timestamps: true,
    }
);

export const Blog = models.Blog || model('Blog', blogSchema);
