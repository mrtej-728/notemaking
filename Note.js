const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
NoteSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model('Note', NoteSchema);
