import express from 'express';
import { photoController } from '../controllers/photo.controller.js';

const photoRouter = express.Router();

photoRouter.post('/', photoController.newPhoto);
photoRouter.put('/:id', photoController.editPhoto);
photoRouter.delete('/:id', photoController.deletePhoto);

export default photoRouter;
