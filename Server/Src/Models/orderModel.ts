import mongoose, { Schema,Document,Model,model} from "mongoose";


interface ORDER extends Document{
    studentId :mongoose.Schema.Types.ObjectId
    courseId:mongoose.Schema.Types.ObjectId 
    tutorId:mongoose.Schema.Types.ObjectId
    status:string
    amount:number
    createdAt:Date
    updatedAt:Date

}

 
const orderSchema = new Schema<ORDER>({
    
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Reference to studentModel
      },
      
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
    },
    tutorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Tutor"
    },
    amount:{
        type:Number,
        required:true

    },
    status:{
        type:String, 
        default:"success"

    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now

    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now
    }
},
{timestamps:true}

)

const orderModel :Model<ORDER> =mongoose.model<ORDER>("Orders",orderSchema)

export default orderModel