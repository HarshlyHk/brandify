import mongoose from "mongoose";

// This schema defines what a single item in the order looks like
const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    // We store the product ID as a reference, just in case
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});

// This is the main schema for the entire order
const orderSchema = new mongoose.Schema(
    {
        // We store shipping info as a guest checkout
        shippingInfo: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        // The array of items they bought, using the schema above
        orderItems: [orderItemSchema],

        // Order totals
        totalPrice: {
            type: Number,
            required: true,
        },

        // Order status
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
