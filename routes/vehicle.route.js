import express from 'express'
import * as VehicleControl from '../controllers/vehicle.controller.js'

const router = express.Router();

router.get('/', VehicleControl.getAll)
router.get('/:id', VehicleControl.getById)
router.post('/', VehicleControl.create)
router.put('/:id/', VehicleControl.update)
router.delete('/:id', VehicleControl.deleteById)

export default router;