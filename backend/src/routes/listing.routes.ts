import express from "express";
import { createListing, updateListing, deleteListing,getAllListings ,getListingsByUser} from "../controllers/listing.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp folder

router.post("/", authMiddleware, upload.array("images", 5), createListing);
router.put("/:id", authMiddleware, upload.array("images", 5), updateListing);
router.delete("/:id", authMiddleware, deleteListing);
router.get("/", getAllListings); 
router.get("/user/:userId", getListingsByUser); 
export default router;
