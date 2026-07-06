import express from 'express';
import { photoController } from '../controllers/photo.controller.js';
import upload from '../config/multer/multer.config.js';

const photoRouter = express.Router();

photoRouter.post('/', upload.single('myPhoto'), photoController.newPhoto);
photoRouter.put('/:id', upload.single('photo'), photoController.editPhoto);
photoRouter.delete('/:id', photoController.deletePhoto);

export default photoRouter;
