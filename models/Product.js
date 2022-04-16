import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:100,
    },
    description:{
        type:String,
        required:true,
        maxLength:200,
    },
    image:{
        type:String,
        required:true,
    },
    prices:{
        type:[Number],
        required:true,
    },
    extraOptions:{
        type:[{
            text:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            }
        }]
    },
},{timestamps:true}) // returns timestamp of creating and updating

// if we have a product model, we won't create it again
// third parameter of mongoose.models is name of collection, it defaults to lowercase form of model name with 's' at the end
export default mongoose.models.Product||mongoose.model("Product",ProductSchema)