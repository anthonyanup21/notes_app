import express from "express"
import router from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express()


//middleware
app.use(cors()); // CORS should be first
app.use(express.json())//to use data which is submitted
app.use("/api/notes", router) //when ever user go to /api/notes url server thrm this routes



connectDB().then(() => {
    app.listen(3000, () => {
        console.log("server is running at port 3000")

    })

})


