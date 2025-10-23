const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notes');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/notes', notesRoutes);
// DB connect
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/note_maker_db';
mongoose.connect(MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
