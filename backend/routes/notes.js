const express = require("express");
const router = express.Router();
const fetchuser = require("../middleWare/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1) :  Get all the notes using GET "/api/auth/fetchallnotes", login required"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Internal server error occured");
  }
});

//ROUTE 2) : Add new notes using POST "/api/auth/addnote", login required"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter valid name, atleast length is 3 characters").isLength({
      min: 3,
    }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if errors, return bad request and the errors...
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(400).json("Internal server error occured");
    }
  }
);


//ROUTE 3) : update an existing note using PUT "/api/auth/updatenote", login required"
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            //New note object

            const newNote={};
            if(title){newNote.title=title}
            if(description){newNote.description=description}
            if(tag){newNote.tag=tag}

            // Find the note to be updated

            let note= await Note.findById(req.params.id)
            if(!note){return res.status(401).send('Not Found')}

            if(note.user.toString() !== req.user.id ){return res.status(401).send('Not Allowed')}
            note= await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
            res.json({note});
            


        } catch (error) {
            console.error(error.message);
            res.status(400).json("Internal server error occured");
        }

    })


//ROUTE 4) : Delete a note using DELETE "/api/auth/deletenote", login required"

router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
      try {
          // const { title, description, tag } = req.body;

          //New note object

          // const newNote={};
          // if(title){newNote.title=title}
          // if(description){newNote.description=description}
          // if(tag){newNote.tag=tag}

          // Find the note to be deleted

          let note= await Note.findById(req.params.id)
          if(!note){return res.status(401).send('Not Found')}

          //Allow deletion only if user owns this Note
          if(note.user.toString() !== req.user.id ){return res.status(401).send('Not Allowed')}
          note= await Note.findByIdAndDelete(req.params.id)
          res.json({"Success":"Note has been deleted"});
          


      } catch (error) {
          console.error(error.message);
          res.status(400).json("Internal server error occured");
      }

  })


module.exports = router;
