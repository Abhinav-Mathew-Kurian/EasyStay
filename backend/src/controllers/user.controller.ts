import { Request, Response } from "express";
import User from '../models/user.model';
import mongoose from 'mongoose';
import cloudinary from "../config/cloudinary";

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    const userProfile = await User.findById(userId)
      .select('-password') // Exclude password from response
      .populate('savedListings', 'title price location images')
      .populate('listedProperties', 'title price location images status')


    if (!userProfile) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Update last active and online status
    await User.findByIdAndUpdate(userId, { 
      lastActive: new Date(), 
      isOnline: true 
    });

    res.status(200).json({
      success: true,
      data: userProfile
    });

  } catch (err: any) {
  console.error("Error updating profile:", err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      success: false, 
      message: "Validation error",
      errors: Object.values(err.errors).map((e: any) => e.message)
    });
  }
};
}
// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    delete updateData.password;
    delete updateData.email;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...updateData, lastActive: new Date() },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    console.error("Error updating profile:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(err.errors).map((e: any) => e.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};


// Upload profile image
export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const imageFile = req.file;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    if (!imageFile) {
      return res.status(400).json({ 
        success: false, 
        message: "No image file provided" 
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Delete old image from cloudinary if exists
    if (user.profileImage) {
      const publicId = user.profileImage.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`userProfile/${publicId}`);
      }
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "userProfile",
      transformation: [
        { width: 400, height: 400, crop: "fill" },
        { quality: "auto" }
      ]
    });

    // Update user with new image URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profileImage: result.secure_url,
        lastActive: new Date()
      },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: {
        profileImage: result.secure_url,
        user: updatedUser
      }
    });

  } catch (err: any) {
  console.error("Error uploading profile image:", err);
  res.status(500).json({ 
    success: false, 
    message: "Error uploading image",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

};







