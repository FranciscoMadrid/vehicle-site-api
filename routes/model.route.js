import express from 'express'
import * as ModelController from '../controllers/model.controller.js'
const router = express.Router();

router.get('/', ModelController.getAll)
router.get('/:id', ModelController.getById)
router.post('/', ModelController.create)
router.put('/:id/', ModelController.update)
router.delete('/:id', ModelController.deleteById)

export default router;