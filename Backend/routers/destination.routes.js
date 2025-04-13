import express from 'express';
import {
  getAllDestinations,
  getDestinationsByCategory,
} from '../controllers/destination.controller.js';

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/:category', getDestinationsByCategory);

export default router;