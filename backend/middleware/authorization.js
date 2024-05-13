import asyncHandler from "./ErrorHandler.js";
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import User from "../model/userModel.js";


export const authorized = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    // if (req.user) {
    //     console.log("user is already authorized");
    //     // res.status(200).json({ message: "user is authorized with google" })
    //     next();
    // }
    // else if (token) {
    //     const { userId } = jwt.decode(token, process.env.SECRET_KEY);
    //     req.user = await User.findById({ _id: userId }).select("-password");
    //     console.log(req.user);
    //     next();
    // }
    if (token) {
        const { userId } = jwt.decode(token, process.env.SECRET_KEY);
        req.user = await User.findById({ _id: userId }).select("-password");
        console.log(req.user);
        next();
    }
    else {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("no token found");
    }
    // if (!token) {
    //     res.status(StatusCodes.BAD_REQUEST);
    //     throw new Error("no token found");
    // }
    // else {
    //     const { userId } = jwt.decode(token, process.env.SECRET_KEY);
    //     req.user = await User.findById({ _id: userId }).select("-password");
    //     // console.log(req.user);
    //     next();
    // }
})

export const authorizedAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    const user = req.user;
    console.log("hello");
    // console.log(user);
    if (user && user.isAdmin) {
        console.log("hi");
        next();
    }
    else {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Admin is not authorized");
    }
})