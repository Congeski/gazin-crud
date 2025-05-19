import { Router } from 'express';
import * as DevsController from '../controllers/desenvolvedoresController';

const router = Router();

router.get('/', DevsController.getAll);
router.post('/', DevsController.create);
router.put('/:id', DevsController.update);
router.delete('/:id', DevsController.remove);

export default router;