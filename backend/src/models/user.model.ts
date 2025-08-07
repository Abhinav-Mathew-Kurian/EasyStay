import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    gender: 'Male' | 'Female' | 'Other';
    occupation?: string;
    bio?: string;

    emailVerified: boolean;
    phoneVerified: boolean;

    address?: {
        street: string;
        area: string;
        city: string;
        state: string;
        pincode: string;
    };

    preferences?: {
        propertyTypes: string[];
        budgetMin: number;
        budgetMax: number;
        amenities: string[];
        genderPreference: 'Male' | 'Female' | 'Any';
        foodPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Any';
    };

    savedListings?: mongoose.Types.ObjectId[];
    listedProperties?: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },

    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },

    occupation: String,
    bio: String,

    address: {
        street: String,
        area: String,
        city: String,
        state: String,
        pincode: String,
    },

    preferences: {
        propertyTypes: [String],
        budgetMin: Number,
        budgetMax: Number,
        amenities: [String],
        genderPreference: {
            type: String,
            enum: ['Male', 'Female', 'Any'],
            default: 'Any',
        },
        foodPreference: {
            type: String,
            enum: ['Vegetarian', 'Non-Vegetarian', 'Any'],
            default: 'Any',
        },
    },

    savedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
    listedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
},
    { timestamps: true })


const User = mongoose.model<IUser>('User',userSchema);
export default User;