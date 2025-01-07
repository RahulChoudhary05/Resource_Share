//backend/model/Resource.js
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  semester: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['pdf', 'youtube', 'link'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploaderUid: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Resource', resourceSchema);