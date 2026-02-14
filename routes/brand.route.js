import express from 'express'
import * as BrandController from '../controllers/brand.controller.js'
const router = express.Router();

router.get('/', BrandController.getAll)
router.get('/:id', BrandController.getById)
router.post('/', BrandController.create)
router.put('/:id/', BrandController.update)
router.delete('/:id', BrandController.deleteById)

export default router;