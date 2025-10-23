const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
// GET all
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
// POST create
router.post('/', async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = new Note({ title, body });
    await note.save();
    res.status(201).json(note);
  } catch (err) { res.status(400).json({ error: err.message }); }
});
// PUT update
router.put('/:id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { title, body, updatedAt: Date.now() }, { new: true });
    if(!note) return res.status(404).json({ error: 'Not found' });
    res.json(note);
  } catch (err) { res.status(400).json({ error: err.message }); }
});
// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if(!note) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) { res.status(400).json({ error: err.message }); }
});
module.exports = router;
