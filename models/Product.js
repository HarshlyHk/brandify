import mongoose from "mongoose";

// 1. the Schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Please provide a product slug"],
            unique: true,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Please provide a product price"],
        },
        image: {
            type: String,
            required: [true, "Please provide a product image URL"],
        },
        category: {
            type: String,
            required: [true, "Please provide a product category"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please provide a product description"],
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        // 2. Add Timestamps
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// 3. Create and Export the Model
const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
