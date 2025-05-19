import { Router } from 'express';
import * as NiveisController from '../controllers/niveisController';

const router = Router();

router.get('/', NiveisController.getAll);
router.post('/', NiveisController.create);
router.put('/:id', NiveisController.update);
router.delete('/:id', NiveisController.remove);

export default router;