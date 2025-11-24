const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Note = require('../models/Note');

// @route   GET api/notes
// @desc    Get all users notes
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/notes
// @desc    Add new note
// @access  Private
router.post('/', auth, async (req, res) => {
  const { ticker, entryPrice, positionType, note } = req.body;

  try {
    const newNote = new Note({
      ticker,
      entryPrice,
      positionType,
      note,
      user: req.user.id
    });

    const noteSaved = await newNote.save();
    res.json(noteSaved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/notes/:id
// @desc    Update note
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { ticker, entryPrice, positionType, note } = req.body;

  // Build note object
  const noteFields = {};
  if (ticker) noteFields.ticker = ticker;
  if (entryPrice) noteFields.entryPrice = entryPrice;
  if (positionType) noteFields.positionType = positionType;
  if (note) noteFields.note = note;

  try {
    let noteDoc = await Note.findById(req.params.id);

    if (!noteDoc) return res.status(404).json({ msg: 'Note not found' });

    // Make sure user owns note
    if (noteDoc.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    noteDoc = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: noteFields },
      { new: true }
    );

    res.json(noteDoc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    // Make sure user owns note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;