const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A file must have a name'],
    unique: true,
    trim: true,
    maxlength: [30, 'A file name must have less or equal then 30 characters'],
  },
  length: {
    type: Number,
    required: [true, 'A file must have a length'],
  },
  info: {
    username: {
      type: String,
      required: [true, 'A info must have a name'],
      trim: true,
    },
    gmail: {
      type: String,
      required: [true, 'A info must have a gmail'],
      trim: true,
    },
  },
})

const File = mongoose.model('File', fileSchema)

module.exports = File
