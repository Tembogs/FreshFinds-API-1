import { Schema, model } from "mongoose";

const productSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description :{
        type: String,
        required: true,    
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
});

const product = model("product", productSchema);
export default product