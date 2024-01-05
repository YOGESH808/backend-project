// noteController.js
const Note = require('../models/notes.models.js');
const User = require('../models/user.models.js');

const getAllNotes = async (req, res) => {
    try {
        const userNotes = await Note.find({ owner: req.user._id });

        // Find notes shared with the authenticated user
        const sharedNotes = await Note.find({ sharedWith: req.user._id });

        // Combine both sets of notes
        const allNotes = [...userNotes, ...sharedNotes];

        res.json(allNotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log(title,content);
        const newNote = new Note({
            title,
            content,
            owner: req.user._id,
        });
        
        if(!title || !content) return res.status(401).json({error:'title or content is required'});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateNoteById = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            { title, content, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteNoteById = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    
        if (!deletedNote) {
          return res.status(404).json({ error: 'Note not found' });
        }
    
        res.json(deletedNote);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const shareNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { shareWith } = req.body;
        console.log(`sharing the ${noteId} with ${shareWith}`);
        //Check if the note exists and is owned by the authenticated user
        const note = await Note.findOne({ _id: noteId, owner: req.user._id });
    
        if (!note) {
          return res.status(404).json({ error: 'Note not found or unauthorized' });
        }
    
        // Find the user to share with by their username
        const userToShareWith = await User.findOne({ username: shareWith });
    
        if (!userToShareWith) {
          return res.status(404).json({ error: 'User to share with not found' });
        }
    
        // Check if the note is already shared with the user
        if (note.sharedWith.includes(userToShareWith._id)) {
          return res.status(400).json({ error: 'Note is already shared with this user' });
        }
    
        // Add the user to the sharedWith array
        note.sharedWith.push(userToShareWith._id);
        await note.save();
    
        res.json({ message: 'Note shared successfully', sharedNote: note });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  

const searchNotes = async (req, res) => {
    try {
        const keyword = req.query.q;
    
        // Use $text to perform a text search on indexed fields
        const notes = await Note.find({
          $and: [
            { $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }] },
            { $or: [{ owner: req.user._id }, { sharedWith: req.user._id }] },
          ],
        });
    
        res.json(notes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNoteById,
    deleteNoteById,
    shareNote,
    searchNotes,
};
