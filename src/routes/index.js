import { Router } from 'express';
import eventRoutes from './eventRoutes.js';
import organizerRoutes from './organizerRoutes.js';

const router = Router();

router.use('/events', eventRoutes);
router.use('/organizers', organizerRoutes);

export default router;
