import express from "express"
import {getAllNotes,createNote,updateNote,deleteNote,getNote} from "../controllers/notes.Controller.js"

const router=express.Router()

//display notes
router.get("/",getAllNotes)


//get a single note
router.get("/:id",getNote)

//create notes
router.post("/",createNote)

//edit the notes
router.put("/:id",updateNote)

//delete a note
router.delete("/:id",deleteNote)

export default router