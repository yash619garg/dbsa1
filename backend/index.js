// import libraries
import express, { urlencoded } from "express";
import cors from "cors";
// import session from "express-session";
// import cookieSession from "cookie-session";
import passport from "passport";
// import Oauth2 from "passport-google-oauth2"
import dotenv from "dotenv";
import path from "path";
import User from "./model/userModel.js"
import cookieParser from "cookie-parser"
import passportUtils from "./utils/passport.js";
// const OAuth2Strategy = Oauth2.Strategy;
dotenv.config();

//database
import connectDB from "./config/connectDB.js";
connectDB();



// import middlewares

// import routes
import userRouter from "./routes/userRoutes.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import blogRoute from "./routes/blogRoute.js";
import projectRoute from "./routes/projectRoute.js"
import orderRoute from "./routes/orderRoute.js"
import brandRoute from "./routes/brandRoute.js"
import createToken from "./utils/createToken.js";
// import createToken from "./utils/createToken.js";

const __dirname = path.resolve();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
passportUtils(app);


// initial google oauth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: true }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}))

app.get("/auth/login/success", async (req, res) => {
    console.log(req.user);
    if (req.user) {
        const userExists = await User.findOne({ email: req.user._json.email })
        if (userExists) {
            createToken(res, userExists._id)
        } else {
            const newUser = new User({
                name: req.user._json.name,
                email: req.user._json.email,
                password: Date.now()
            })
            createToken(res, newUser._id)
            await newUser.save()
        }
        res.status(200).json({ ...req.user, _id: userExists._id, isAdmin: userExists.isAdmin },)
    } else {
        res.status(403).json({
            message: "Not Authorized",
        })
    }
})



app.use("/api/users", userRouter);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/blog', blogRoute);
app.use('/api/project', projectRoute);
app.use("/api/orders", orderRoute);
app.use("/api/brands", brandRoute);
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use(express.static(path.join(__dirname, './frontend/dist')));
// app.use(express.static(path.join(__dirname, './frontend')));
app.use((req, res, next) => {
    if (req.url.endsWith('.jsx') || req.url.endsWith('.js')) {
        res.contentType('application/javascript');
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    res.sendFile(path.join(__dirname, 'frontend', "dist", 'index.html'));
})

app.use('/js', express.static(path.join(__dirname, '/frontend/dist/js'), {
    // Set content type explicitly to application/javascript
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));



app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});



app.use('/', (req, res) => {
    res.send("GET Request Called")
})



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})