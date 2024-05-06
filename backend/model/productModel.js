import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema;


const reviewSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true })


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mainImage: { type: String, required: true },
    sideImage1: { type: String },
    sideImage2: { type: String },
    brand: { type: String, required: true },
    category: { type: ObjectId, required: true, ref: "Category" },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    review: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);
export default Product;