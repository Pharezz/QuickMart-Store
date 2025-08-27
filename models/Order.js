import mongoose, { Schema } from "mongoose";


const OrderSchema = new Schema(
{
items: [
{
productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
title: String,
price: Number,
qty: Number,
},
],
customer: {
name: String,
email: String,
address: String,
phone: String,
},
total: Number,
status: { type: String, default: "pending" },
},
{ timestamps: true }
);


export default mongoose.models.Order || mongoose.model("Order", OrderSchema);