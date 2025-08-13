import express from "express";
import { createListing, updateListing, deleteListing,getAllListings ,getListingsByUser,getListingByListingId} from "../controllers/listing.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

router.post("/", authMiddleware, upload.array("images", 5), createListing);
router.put("/:id", authMiddleware, upload.array("images", 5), updateListing);
router.delete("/:id", authMiddleware, deleteListing);
router.get("/", getAllListings); 
router.get("/user/:userId", getListingsByUser); 
router.get("/room/:roomId", getListingByListingId); 
export default router;
