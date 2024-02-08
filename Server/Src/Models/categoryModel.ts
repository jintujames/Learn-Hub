import { Schema, Document, model, Model } from "mongoose";

interface ICATEGORY extends Document {
  categoryName: string;

  photo: string[];

  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICATEGORY>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    
    photo: [
      {
        type: String,
      },
    ],

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Define the model using the model function and export it
const CategoryModel: Model<ICATEGORY> = model<ICATEGORY>(
  "categorycollection",
  categorySchema
);
export default CategoryModel;
