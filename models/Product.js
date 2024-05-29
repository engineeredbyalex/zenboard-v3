import mongoose, { model, Schema, models } from "mongoose";

const PropertySchema = new Schema({
  name: { type: String, required: true },
  values: [{ type: String, required: true }], // Update here to directly store an array of strings
});

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    newPrice: { type: Number, },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [PropertySchema],
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
