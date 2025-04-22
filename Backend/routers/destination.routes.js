import express from 'express';
import {
  getAllDestinations,
  getDestinationsByCategory,
  getAllTamilDestinations,
  getTamilDestinationsByCategory,
} from '../controllers/destination.controller.js';

const router = express.Router();

router.get('/english/', getAllDestinations);
router.get('/english/:category', getDestinationsByCategory);

router.get('/tamil', getAllTamilDestinations);
router.get('/tamil/:category', getTamilDestinationsByCategory);

export default router;