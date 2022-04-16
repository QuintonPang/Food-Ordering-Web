import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    customer:{
        type:String,
        required:true,
        maxLength:100,
    },
    address:{
        type:String,
        required:true,
        maxLength:200,
    },
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:Number,
        default: 0,
        required:true,
    },
},{timestamps:true}) // returns timestamp of creating and updating

// if we have a product model, we won't create it again
export default mongoose.models.Order||mongoose.model("Order",OrderSchema)