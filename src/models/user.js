import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true,
    },
     password:{
        type: String,
        required: true,
     },
     address : {
        type: String,
        required: false,
     },

     role : {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
     },
     cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
     ],
});

const User = model('User', userSchema);


export default User;