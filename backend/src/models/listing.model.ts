import mongoose, { Document, Schema } from "mongoose";

export interface IListing extends Document {
  title: string;
  slug: string;
  type: string;
  description: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
    city: string;
    area: string;
  };
  state: string;
  pincode: string;
  occupancy: {
    allowed: string[];
    gender: "Male" | "Female" | "Any";
  };
  shared_with: number;
  current_occupants: number;
  is_occupied: boolean;
  amenities: string[];
  restrictions: string[];
  monthly_rent: number;
  images: string[];
  availability: {
    is_available: boolean;
    available_from: Date;
  };
  reviews: {
    rating: number;
    count: number;
  };
  owner: {
    name: string;
    contact: string;
  };
}

const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    type: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      city: { type: String, required: true },
      area: { type: String, required: true },
    },

    state: { type: String, required: true },
    pincode: { type: String, required: true },

    occupancy: {
      allowed: [{ type: String, required: true }],
      gender: { type: String, enum: ["Male", "Female", "Any"], required: true },
    },

    shared_with: { type: Number, required: true },
    current_occupants: { type: Number, required: true },
    is_occupied: { type: Boolean, default: false },

    amenities: [{ type: String, trim: true }],
    restrictions: [{ type: String, trim: true }],

    monthly_rent: { type: Number, required: true },

    images: {
      type: [String],
      validate: {
        validator: (val: string[]) => val.length >= 3 && val.length <= 5,
        message: "A listing must have between 3 and 5 images",
      },
      required: true,
    },

    availability: {
      is_available: { type: Boolean, default: true },
      available_from: { type: Date, required: true },
    },

    reviews: {
      rating: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, default: 0 },
    },

    owner: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
    },
  },
  { timestamps: true }
);

listingSchema.index({ location: "2dsphere" });

const Listing = mongoose.model<IListing>("Listing", listingSchema);
export default Listing;
