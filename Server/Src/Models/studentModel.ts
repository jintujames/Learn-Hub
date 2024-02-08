import bcrypt from "bcrypt"
import mongoose, { Schema, Document, model, Model } from "mongoose";

interface NewStudent extends Document {
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string,
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isBlocked: boolean;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<NewStudent>(
    {
        studentFirstName: {
            type: String,
           
        },
        studentLastName: {
            type: String,
            
        },
        studentEmail: {
            type: String,
            required:true,
            unique: true
        },
        phone: {
            type: String,
            
        },
        password: {
            type: String,
           
        },
        isBlocked: {
            type: Boolean,
           
            default: false
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
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  userSchema.pre<NewStudent>("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  const User = mongoose.model('User',userSchema)

  export default User;



 