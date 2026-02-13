import express from 'express';
import * as LogController from '../controllers/log.controller.js';

const router = express.Router();

router.get('/', LogController.getAll);
router.get('/:id', LogController.getById);
router.post('/', LogController.create);
router.put('/:id', LogController.update);
router.delete('/:id', LogController.deleteById);

router.get('/vehicle/:vehicleId', LogController.getByVehicleId);

export default router;