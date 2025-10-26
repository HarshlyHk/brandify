import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        // This is the only method we need for now
        case "POST":
            try {
                // Get the order data from the request body
                const orderData = req.body;

                // Create the new order in the database
                const order = await Order.create(orderData);

                // Send back a success message and the new order
                res.status(201).json({ success: true, data: order });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(400).json({
                success: false,
                message: "Method not allowed",
            });
            break;
    }
}
