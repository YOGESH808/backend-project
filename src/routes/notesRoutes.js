const express = require("express");
const notesRouter = express.Router();
const noteController = require('../controllers/notesControllers');
const authenticationMiddleware = require('../middlewares/auth.middlewares.js');


notesRouter.use(authenticationMiddleware);
notesRouter.get('/notes', noteController.getAllNotes);
notesRouter.get('/notes/:id', noteController.getNoteById);
notesRouter.post('/notes', noteController.createNote);
notesRouter.put('/notes/:id', noteController.updateNoteById);
notesRouter.delete('/notes/:id', noteController.deleteNoteById);
notesRouter.post('/notes/:id/share', noteController.shareNote);
notesRouter.get('/search', noteController.searchNotes);

module.exports = notesRouter;