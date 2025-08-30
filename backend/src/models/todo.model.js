import mongoose from "mongoose";
const todoSchema = new mongoose.Schema(
    {
        ownerId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        text: {
            type:String,
            required:true,
        },
        category: {
            type:String,
            default:'No'
        },
        isDone: {
            type:Boolean,
            default: false
        }
    } ,
    {timestamps: true}
)
const Todo = mongoose.model("Todo", todoSchema)

export default Todo