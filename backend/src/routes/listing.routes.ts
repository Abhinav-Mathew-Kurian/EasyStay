import express from "express";
import { createListing, updateListing, deleteListing } from "../controllers/listing.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp folder

router.post("/", authMiddleware, upload.array("images", 5), createListing);
router.put("/:id", authMiddleware, upload.array("images", 5), updateListing);
router.delete("/:id", authMiddleware, deleteListing);

export default router;
