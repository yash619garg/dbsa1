import asyncHandler from "../middleware/ErrorHandler.js";
import Product from "../model/productModel.js";

export const addProduct = asyncHandler(async (req, res) => {
    const { name, price, category, brand, description } = req.fields;
    switch (true) {
        case !name:
            res.status(409);
            throw new Error("name is required");
        case !price:
            res.status(409);
            throw new Error("price is required");
        case !category:
            res.status(409);
            throw new Error("category is required");
        case !brand:
            res.status(409);
            throw new Error("brand name is required");
        case !description:
            res.status(409);
            throw new Error("description is required");
    }
    const product = await new Product({ ...req.fields }).save();
    res.status(200).json(product);
})

export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, category, brand, description, quantity } = req.fields;
    switch (true) {
        case !name:
            res.status(401);
            throw new Error("name is required");
        case !price:
            console.log("hello");
            res.status(401);
            throw new Error("price is required");
        case !category:
            res.status(401);
            throw new Error("category is required");
        case !brand:
            res.status(401);
            throw new Error("brand name is required");
        case !description:
            res.status(401);
            throw new Error("description is required");
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true });
    if (!updatedProduct) {
        res.status(404);
        throw new Error("product not found");

    }
    res.status(200).json(updatedProduct);
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }
    res.status(200).json(product);

})

export const fetchSixProducts = asyncHandler(async (req, res) => {
    const pageSize = 6;
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};
    const count = (await Product.countDocuments({ ...keyword }));
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.status(200).json({
        page: 1,
        products,
        pages: Math.ceil(count / pageSize),
        hasMore: false
    })
})

export const fetchProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("product not found");
    }
    else {
        res.status(200).json(product);
    }
})
export const getAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (!products) {
        res.status(404);
        throw new Error("no product found");
    }
    else {
        res.status(200).json(products);
    }
})

export const addProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    if (!rating) {
        res.status(400);
        throw new Error("rating is required")
    }
    else if (!comment) {
        res.status(400);
        throw new Error("comment is required")
    }
    else {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error("product not found");
        } else {
            console.log(product);
            const alreadyReviewed = product.review.find((r) => r.user.toString() === req.user._id.toString());
            if (alreadyReviewed) {
                console.log(alreadyReviewed._id);
                product.review = product.review.filter((r) => r._id !== alreadyReviewed._id);
            }
            const review = {
                user: req.user._id,
                comment,
                rating: Number(rating),
                name: req.user.username,
                email: req.user.email,
            }
            product.review.push(review);
            product.numReviews = product.review.length;
            product.rating = (product.review.reduce((add, item) => {
                add = add + item.rating;
                return add;
            }, 0)) / product.review.length;
            await product.save();
            res.status(201).json(product);
        }
    }
})

export const fetchTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(6);
    if (!products) {
        res.status(404);
        throw new Error("no product found");
    }
    else {
        res.status(200).json(products);
    }
})

export const fetchNewProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 }).limit(6);
    if (!products) {
        res.status(404);
        throw new Error("no product found");
    }
    else {
        res.status(200).json(products);
    }
})

export const categoryProduct = asyncHandler(async (req, res) => {
    const { brand, category, lowPrice, highPrice, keyword, page } = req.query;
    console.log(req.query);
    const limit = 6;
    // const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};
    const filtered = []
    if (brand) {
        const newBrand = brand.split(",");
        filtered.push({ brand: { $in: newBrand } });
    }
    if (category) {
        const newCategory = category.split(",");
        filtered.push({ category: { $in: newCategory } });
    }
    if (lowPrice && highPrice) {
        filtered.push({ price: { $gt: lowPrice, $lt: highPrice } });
    }
    else if (lowPrice) {
        filtered.push({ price: { $gt: lowPrice } });
    }
    else if (highPrice) {
        filtered.push({ price: { $lt: highPrice } });
    }
    if (keyword) {
        filtered.push({ name: { $regex: keyword, $options: "i" } })
    }

    const skip = (page - 1) * limit;

    let finalString = {}
    if (filtered.length !== 0) {
        finalString = { $and: filtered };
    }

    console.log(filtered);
    let numOfProduct = await Product.find(finalString);
    numOfProduct = numOfProduct.length;
    // console.log(numOfProduct.length);
    const products = await Product.find(finalString).skip(skip).limit(limit);
    res.json({ products, numOfProduct });
})
