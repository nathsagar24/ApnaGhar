import { Router } from 'express';
import { validateProperty } from '../middleware/validation.middleware.js';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties
} from '../controllers/property.controller.js';

const router = Router();

router.get('/', getAllProperties);
router.get('/search', searchProperties);
router.get('/:id', getPropertyById);
router.post('/', validateProperty, createProperty);
router.put('/:id', validateProperty, updateProperty);
router.delete('/:id', deleteProperty);

export const propertyRoutes = router;