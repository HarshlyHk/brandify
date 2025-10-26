import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const { method } = req;

    // 1. Connect to our database
    await dbConnect();

    switch (method) {
        // 2. A case for GET requests (getting all products)
        case "GET":
            try {
                // 3. Find all products in the database
                const products = await Product.find({});

                // 4. Send them back as a JSON response
                res.status(200).json({ success: true, data: products });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        // 5. A case for POST requests (creating a new product)
        case "POST":
            try {
                // 6. Get the product data from the request body
                const productData = req.body;

                // 7. Create the new product in the database
                const product = await Product.create(productData);

                // 8. Send back a success message and the new product
                res.status(201).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            // 9. If any other method is used, send a 400 error
            res.status(400).json({
                success: false,
                message: "Method not allowed",
            });
            break;
    }
}
