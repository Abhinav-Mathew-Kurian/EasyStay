import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  phone?: string;
  gender: "male" | "female" | "other";
  profileImage?: string;

  occupation?: string;
  bio?: string;

  emailVerified: boolean;
  phoneVerified: boolean;

  address?: {
    street?: string;
    area?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  preferences?: {
    propertyTypes?: string[];
    budgetMin?: number;
    budgetMax?: number;
    amenities?: string[];
    genderPreference?: "male" | "female" | "any";
    foodPreference?: "Vegetarian" | "Non-Vegetarian" | "any";
  };

  savedListings?: mongoose.Types.ObjectId[];
  listedProperties?: mongoose.Types.ObjectId[];
  conversations?: mongoose.Types.ObjectId[]; 
  
  // Additional fields for user activity
  lastActive?: Date;
  isOnline?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    profileImage: { type: String, trim: true },

    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },

    occupation: { type: String, trim: true },
    bio: { type: String, trim: true },

    address: {
      street: { type: String, trim: true },
      area: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true },
    },

    preferences: {
      propertyTypes: [{ type: String, trim: true }],
      budgetMin: { type: Number, min: 0 },
      budgetMax: { type: Number, min: 0 },
      amenities: [{ type: String, trim: true }],
      genderPreference: {
        type: String,
        enum: ["male", "female", "any"],
        default: "any",
      },
      foodPreference: {
        type: String,
        enum: ["Vegetarian", "Non-Vegetarian", "any"],
        default: "any",
      },
    },

    savedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
    listedProperties: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    ],
    conversations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    ],

    lastActive: { type: Date, default: Date.now },
    isOnline: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ 'address.city': 1 });
userSchema.index({ lastActive: 1 });


userSchema.pre('save', function(next) {
  this.lastActive = new Date();
  next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;