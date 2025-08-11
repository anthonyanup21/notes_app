import mongoose from "mongoose";

//1. create schema
//2.create modele from that schema

const {Schema}=mongoose
const noteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },    
},
    {timestamps:true} //mongodb will give u createdAt and updatedAt

)

const Note=mongoose.model("Note",noteSchema)

export default Note