// import libraries
import express, { urlencoded } from "express";
import cors from "cors";
// import session from "express-session";
// import passport from "passport";
// import Oauth2 from "passport-google-oauth2"
import dotenv from "dotenv";
import path from "path";
import User from "./model/userModel.js"
import cookieParser from "cookie-parser"
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
// import createToken from "./utils/createToken.js";

const __dirname = path.resolve();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes



// app.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//     new OAuth2Strategy({
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//         scope: ["profile", "email"]
//     },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const email = profile.emails[0].value;

//                 let user = await User.findOne({ email });

//                 if (!user) {
//                     user = new User({
//                         password: profile.id,
//                         username: profile.displayName,
//                         email: profile.emails[0].value,
//                         // image: profile.photos[0].value
//                     });

//                     await user.save();
//                 }
//                 return done(null, user)
//             } catch (error) {
//                 console.log(error);
//                 return done(error, null)
//             }
//         }
//     )
// )
// passport.serializeUser((user, done) => {
//     done(null, user);
// })

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // initial google ouath login
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// app.get("/auth/google/callback", passport.authenticate("google", {
//     successRedirect: process.env.FRONTEND_URL,
//     failureRedirect: `${process.env.FRONTEND_URL}/login`
// }))

// app.get("/login/success", async (req, res) => {

//     if (req.user) {
//         console.log(req.user);
//         res.status(200).json({ message: "user Login", user: req.user })
//         createToken()
//     } else {
//         res.status(400).json({ message: "Not Authorized" })
//     }
// })



app.use("/api/users", userRouter);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/blog', blogRoute);
app.use('/api/project', projectRoute);
app.use("/api/orders", orderRoute);
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use(express.static(path.join(__dirname, './frontend/dist')));
app.use((req, res, next) => {
    if (req.url.endsWith('.jsx') || req.url.endsWith('.js')) {
        res.contentType('application/javascript');
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

app.use('/js', express.static(path.join(__dirname, '/frontend/dist/js'), {
    // Set content type explicitly to application/javascript
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', "dist", 'index.html'));
})

// app.use(express.static(path.join(__dirname, '/frontend/dist')));


// app.use(express.static("./public"));




app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// app.get('/*.jsx', (req, res) => {
//     console.log("hiii");
//     console.log(req);
//     // Set the appropriate content type header for JavaScript files
//     res.setHeader('Content-Type', 'application/javascript');

//     // Send the JavaScript file
//     res.sendFile(path.join(__dirname, 'frontend', "dist", req.path));
// });


app.use('/', (req, res) => {
    res.send("GET Request Called")
})



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})