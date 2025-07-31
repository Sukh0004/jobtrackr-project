import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Apply auth middleware to all job routes
router.use(requireAuth);

router.get('/', getAllJobs);
router.post('/', createJob);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;