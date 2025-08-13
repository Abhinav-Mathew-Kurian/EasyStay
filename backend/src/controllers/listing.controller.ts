import { Request, Response } from "express";
import Listing from "../models/listing.model";
import User from "../models/user.model";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Create a listing

export const createListing = async (req: Request, res: Response) => {
  try {
    const {
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
      availability,
      owner,
    } = req.body;

    const userId = (req as any).user.userId;

    if (!req.files || (req.files as Express.Multer.File[]).length < 3) {
      return res
        .status(400)
        .json({ message: "Please upload between 3 and 5 images" });
    }

    // Parse JSON strings into objects
    const parsedLocation = JSON.parse(location);
    const parsedOccupancy = JSON.parse(occupancy);
    const parsedAvailability = JSON.parse(availability);
    const parsedOwner = JSON.parse(owner);
    const parsedAmenities = JSON.parse(amenities);
    const parsedRestrictions = JSON.parse(restrictions);

    // Filter out empty strings from occupancy.allowed
    if (Array.isArray(parsedOccupancy.allowed)) {
      parsedOccupancy.allowed = parsedOccupancy.allowed.filter(
        (s: string) => s && s.trim() !== ""
      );
    }

    if (!parsedOccupancy.allowed.length) {
      return res
        .status(400)
        .json({ message: "occupancy.allowed must have at least one allowed type" });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const uploadedImages: string[] = [];

    for (const file of imageFiles) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "listings",
      });
      uploadedImages.push(result.secure_url);
    }

    const listing = new Listing({
      title,
      slug,
      type,
      description,
      location: parsedLocation,
      state,
      pincode,
      occupancy: parsedOccupancy,
      shared_with,
      current_occupants,
      amenities: parsedAmenities,
      restrictions: parsedRestrictions,
      monthly_rent,
      images: uploadedImages,
      availability: parsedAvailability,
      owner: parsedOwner,
    });

    await listing.save();

    // Append to user's listedProperties
    await User.findByIdAndUpdate(userId, {
      $push: { listedProperties: listing._id },
    });

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
export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find().populate('owner'); 
    res.json({ listings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getListingsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Find user and get their listedProperties IDs
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user has no listings
    if (!user.listedProperties || user.listedProperties.length === 0) {
      return res.json({ listings: [] });
    }

    // Find listings by IDs in user's listedProperties
    const listings = await Listing.find({
      _id: { $in: user.listedProperties },
    });

    res.json({ listings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getListingByListingId =async(req:Request, res:Response)=>{
  try{
    const roomId =req.params.roomId;
    const room =await Listing.findById(roomId)
    res.json(room)
  }catch(error){
    console.log("Error fetching listing by ID:",error)
  }
}