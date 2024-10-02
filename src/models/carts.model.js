import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    products: {
        type: Array,
        id: Number,
        quantity: Number
    },
    status: { type: Boolean, required: true },
},
    {
        versionKey: false //Desactiva el _v
    }
);

export const cartModel = mongoose.model(cartCollection, cartSchema)  
