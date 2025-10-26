import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    // Get the id from the URL (e.g., /api/products/12345)
    const {
        query: { id },
        method,
    } = req;

    // Connect to the database
    await dbConnect();

    switch (method) {
        // 1. A case for GET (getting a single product by its id)
        case "GET":
            try {
                const product = await Product.findById(id);

                if (!product) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Product not found" });
                }

                res.status(200).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        // 2. A case for PUT (updating a single product)
        case "PUT":
            try {
                // Find the product by ID and update it with the new data from req.body
                const product = await Product.findByIdAndUpdate(id, req.body, {
                    new: true, // Return the updated document
                    runValidators: true, // Run schema validation
                });

                if (!product) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Product not found" });
                }

                res.status(200).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        // 3. A case for DELETE (deleting a single product)
        case "DELETE":
            try {
                const deletedProduct = await Product.deleteOne({ _id: id });

                if (deletedProduct.deletedCount === 0) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Product not found" });
                }

                res.status(200).json({
                    success: true,
                    message: "Product deleted",
                });
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
