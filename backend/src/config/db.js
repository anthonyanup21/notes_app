
import mongoose from "mongoose"
export const connectDB=async ()=>{
    try{
            await mongoose.connect(process.env.MONGODB_URL)
            console.log("Database connected successfully")

    }catch (error){

        console.log("error while connecting database\n",error)
        process.exit(1)//stops further execution of code 1 means there is an error and 0 means there is no error

    }

}

