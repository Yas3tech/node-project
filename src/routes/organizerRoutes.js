import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { createOrganizerSchema, updateOrganizerSchema } from '../validators/organizerValidator.js';
import {
    getOrganizers,
    getOrganizerById,
    createOrganizer,
    updateOrganizer,
    deleteOrganizer
} from '../controllers/organizerController.js';

const router = Router();

router.get('/', getOrganizers);
router.get('/:id', getOrganizerById);
router.post('/', validate(createOrganizerSchema), createOrganizer);
router.put('/:id', validate(updateOrganizerSchema), updateOrganizer);
router.delete('/:id', deleteOrganizer);

export default router;
