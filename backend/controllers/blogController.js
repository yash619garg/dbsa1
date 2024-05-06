import asyncHandler from "../middleware/ErrorHandler.js";
import Blog from "../model/blogSchema.js";


export const createBlog = asyncHandler(async (req, res) => {
    const { title, blog } = req.body;
    if (!title || !blog) {
        res.status(400);
        throw new Error("please fill all the inputs");
    }
    else {
        const newBlog = await new Blog({ title, blog }).save();
        if (!newBlog) {
            res.status(404);
            throw new Error("something went wrong")
        }
        res.status(200).json(newBlog);
    }
})

export const updateBlog = asyncHandler(async (req, res) => {
    const { title, blog } = req.body;
    const id = req.params.id;

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
        res.status(404);
        throw new Error("blog does not found");
    }
    else {
        existingBlog.title = title || existingBlog.title;
        existingBlog.blog = blog || existingBlog.blog;

        await existingBlog.save();
        res.status(200).json(existingBlog);
    }
})

export const blogById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
        res.status(404);
        throw new Error("blog does not found");
    }
    else {
        res.status(200).json(blog);
    }
})

export const allBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).limit(6).sort("-createdAt");
    res.status(200).json(blogs);
})

export const deleteBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).json("blog deleted successfully");
})