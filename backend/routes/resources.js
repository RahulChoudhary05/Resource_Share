//backend/routes/resource.js

import express from 'express';
import Resource from '../models/Resource.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get resources by semester
router.get('/semester/:semester', async (req, res) => {
  try {
    const resources = await Resource.find({ semester: req.params.semester })
      .populate('uploadedBy', 'name');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

// Get resources by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const resources = await Resource.find({ subject: req.params.subject })
      .populate('uploadedBy', 'name');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

// Add new resource (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      uploadedBy: req.user.userId
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource' });
  }
});

export default router;