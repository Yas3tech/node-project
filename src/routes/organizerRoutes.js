import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Organizers endpoint' });
});

export default router;
