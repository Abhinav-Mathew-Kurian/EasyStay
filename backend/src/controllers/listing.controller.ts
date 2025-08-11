import { Request, Response } from "express";
import Listing from "../models/listing.model";
import User from "../models/user.model";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a listing
export const createListing = async (req: Request, res: Response) => {
  try {
    const { title, slug, type, description, location, state, pincode, occupancy, shared_with, current_occupants, amenities, restrictions, monthly_rent, availability, owner } = req.body;

    const userId = (req as any).user.userId; 

    if (!req.files || (req.files as Express.Multer.File[]).length < 3) {
      return res.status(400).json({ message: "Please upload between 3 and 5 images" });
    }

    
    const imageFiles = req.files as Express.Multer.File[];
    const uploadedImages: string[] = [];

    for (const file of imageFiles) {
      const result = await cloudinary.uploader.upload(file.path, { folder: "listings" });
      uploadedImages.push(result.secure_url);
    }

    // Create listing
    const listing = new Listing({
      title,
      slug,
      type,
      description,
      location,
      state,
      pincode,
      occupancy,
      shared_with,
      current_occupants,
      amenities,
      restrictions,
      monthly_rent,
      images: uploadedImages,
      availability,
      owner,
    });

    await listing.save();

    // Append to user's listedProperties
    await User.findByIdAndUpdate(userId, { $push: { listedProperties: listing._id } });

    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update listing
export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If images provided, upload and replace
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const imageFiles = req.files as Express.Multer.File[];
      const uploadedImages: string[] = [];

      for (const file of imageFiles) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "listings" });
        uploadedImages.push(result.secure_url);
      }

      updates.images = uploadedImages;
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedListing) return res.status(404).json({ message: "Listing not found" });

    res.json({ message: "Listing updated", listing: updatedListing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete listing
export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    await Listing.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { listedProperties: id } });

    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
