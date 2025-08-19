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
      .select('-password') 
      .populate('savedListings', 'title price location images')
      .populate('listedProperties', 'title price location images status');

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

    // Normalize the user data to ensure all expected fields exist
    const normalizedUser = {
      ...userProfile.toObject(),
      address: userProfile.address ? {
        street: userProfile.address.street || '',
        area: userProfile.address.area || '',
        city: userProfile.address.city || '',
        state: userProfile.address.state || '',
        pincode: userProfile.address.pincode || ''
      } : {
        street: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
      },
      preferences: userProfile.preferences ? {
        propertyTypes: userProfile.preferences.propertyTypes || [],
        budgetMin: userProfile.preferences.budgetMin || 0,
        budgetMax: userProfile.preferences.budgetMax || 0,
        amenities: userProfile.preferences.amenities || [],
        genderPreference: userProfile.preferences.genderPreference || 'any',
        foodPreference: userProfile.preferences.foodPreference || 'any'
      } : {
        propertyTypes: [],
        budgetMin: 0,
        budgetMax: 0,
        amenities: [],
        genderPreference: 'any',
        foodPreference: 'any'
      },
      occupation: userProfile.occupation || '',
      bio: userProfile.bio || '',
      phone: userProfile.phone || ''
    };

    res.status(200).json({
      success: true,
      data: normalizedUser
    });

  } catch (err: any) {
    console.error("Error fetching profile:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: "Validation error",
        errors: Object.values(err.errors).map((e: any) => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    // Remove sensitive/protected fields
    delete updateData.password;
    delete updateData.email;
    delete updateData._id;
    delete updateData.__v;
    delete updateData.emailVerified;
    delete updateData.phoneVerified;
    delete updateData.createdAt;
    delete updateData.updatedAt;


    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    const mergedData: any = {
      ...updateData,
      lastActive: new Date()
    };

   
    if (updateData.address) {
      mergedData.address = {
        ...currentUser.address, 
        ...updateData.address
      };
    }

    
    if (updateData.preferences) {
      mergedData.preferences = {
        ...currentUser.preferences, 
        ...updateData.preferences
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      mergedData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    const normalizedUser = {
      ...updatedUser.toObject(),
      address: updatedUser.address ? {
        street: updatedUser.address.street || '',
        area: updatedUser.address.area || '',
        city: updatedUser.address.city || '',
        state: updatedUser.address.state || '',
        pincode: updatedUser.address.pincode || ''
      } : {
        street: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
      },
      preferences: updatedUser.preferences ? {
        propertyTypes: updatedUser.preferences.propertyTypes || [],
        budgetMin: updatedUser.preferences.budgetMin || 0,
        budgetMax: updatedUser.preferences.budgetMax || 0,
        amenities: updatedUser.preferences.amenities || [],
        genderPreference: updatedUser.preferences.genderPreference || 'any',
        foodPreference: updatedUser.preferences.foodPreference || 'any'
      } : {
        propertyTypes: [],
        budgetMin: 0,
        budgetMax: 0,
        amenities: [],
        genderPreference: 'any',
        foodPreference: 'any'
      },
      occupation: updatedUser.occupation || '',
      bio: updatedUser.bio || '',
      phone: updatedUser.phone || ''
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: normalizedUser,
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
        try {
          await cloudinary.uploader.destroy(`userProfile/${publicId}`);
        } catch (deleteError) {
          console.log("Could not delete old image:", deleteError);
        }
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


export const addToSavedListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { listingId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { savedListings: listingId } }, 
      { new: true } 
    ).populate("savedListings"); 

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, savedListings: user.savedListings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const removeFromSavedListing = async (req: Request, res: Response) => {
  const { id } = req.params;          
  const { listingId } = req.body;    

  try {
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { savedListings: listingId } }, 
      { new: true }
    ).populate("savedListings"); 

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, savedListings: user.savedListings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
