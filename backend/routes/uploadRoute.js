import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp /;
    const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype

    if (filetypes.test(extname) && mimeTypes.test(mimeType)) {

        cb(null, true);
    }
    else {
        cb(new Error("Images Only"), false);
    }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');



router.route("/").post((req, res) => {
    uploadSingleImage(req, res, (err) => {
        console.log(req.file);
        if (err) {
            res.status(400).send({ message: err.message })
        }
        else if (req.file) {
            res.status(200).json({
                message: "image upload successfully",
                image: `/${req.file.path}`
            })
        }
        else {
            res.status(400).json({ message: "no image file provided" });
        }
    })
})


export default router;