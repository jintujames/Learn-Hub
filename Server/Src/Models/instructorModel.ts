import bcrypt from "bcrypt";
import mongoose, { Schema, Document, model, Model } from "mongoose";

interface ITUTOR extends Document {
  instructorFirstName: string;
  instructorLastName: string;
  instructorEmail: string;
  phone: string;
  password: string;
  photo: string;
  courses: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const instructorSchema = new Schema<ITUTOR>(
  {
    instructorFirstName: {
      type: String,
      required: true,
    },
    instructorLastName: {
      type: String,
      required: true,
    },
    instructorEmail: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    photo: [
      {
        type: String,
      },
    ],
    courses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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
  },

  { timestamps: true }
);

instructorSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

instructorSchema.pre<ITUTOR>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Tutor = mongoose.model("Tutor", instructorSchema);

export default Tutor;
