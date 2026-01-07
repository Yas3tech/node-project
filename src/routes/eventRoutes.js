import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { createEventSchema, updateEventSchema } from '../validators/eventValidator.js';
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', validate(createEventSchema), createEvent);
router.put('/:id', validate(updateEventSchema), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
