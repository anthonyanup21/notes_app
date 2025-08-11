import Note from "../models/Note.js"

//get all the notes
export const getAllNotes = async (req, res) => {
    try {
        const allNotes = await Note.find().sort({ createdAt: -1 })//1 for asending and -1 for decending .sort all the notes in decending order .(gives latest notes first)
        res.status(200).json(allNotes)

    } catch (error) {
        res.status(500).json({ message: "internal server error" })
        console.log("error in getAllNotes controller\n", error)

    }
}

//create notes
export const createNote = async (req, res) => {
    try {

        const { title, content } = req.body
        const newNote = new Note({
            title: title,
            content: content
        })

        const savedNote = await newNote.save()
        res.status(201).json(savedNote)



    } catch (error) {
        res.status(500).json({ message: "internal server error" })
        console.log("error in createNote controller\n", error)

    }
}

//update a notes
export const updateNote = async (req, res) => {


    try {

        const { title, content } = req.body

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title: title, content: content }, { new: true })

        if (!updatedNote) {
            return res.status(404).json({ message: "id doesnt exist" })
        }

        res.status(200).json(updateNote)

    } catch (error) {
        console.log("error in updateNote controller\n", error)
    }


}

//delete a note
export const deleteNote = async (req, res) => {

    try {

        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if (!deletedNote) {
            return res.status(404).json({ message: "id not found" })
        }
        res.status(200).json(deleteNote)


    } catch (error) {

        console.log("error in deleteNote controller", error)
        res.status(500).json({ message: "internal server error" })

    }
}

//get a single note

export const getNote = async (req, res) => {
    try {

        const singleNote = await Note.findById(req.params.id)

        if (!singleNote) {
            return res.status(404).json({ message: "id not found" })
        }
        res.status(200).json(singleNote)


    } catch (error) {
        console.log("error in getNote controller", error)
        res.status(500).json({ message: "internal server error" })

    }
}