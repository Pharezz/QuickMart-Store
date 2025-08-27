import mongoose, { Schema } from "mongoose";


const ProductSchema = new Schema(
{
title: { type: String, required: true },
price: { type: Number, required: true, min: 0 },
image: { type: String, default: "" }, // URL
description: { type: String, default: "" },
category: { type: String, default: "General" },
stock: { type: Number, default: 100 },
},
{ timestamps: true }
);


export default mongoose.models.Product || mongoose.model("Product", ProductSchema);