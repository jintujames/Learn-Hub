import { Schema, Document, model, Model } from "mongoose";

interface ICATEGORY extends Document {
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const categorySchema = new Schema<ICATEGORY>(
  {
    categoryName: {
      type: String,
      required: true,
    },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Define the model using the model function and export it
const CategoryModel: Model<ICATEGORY> = model<ICATEGORY>(
  "category",
  categorySchema
);
export default CategoryModel;
