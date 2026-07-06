import express from 'express';
import { photoController } from '../controllers/photo.controller.js';
import upload from '../config/multer/multer.config.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const photoRouter = express.Router();

photoRouter.post(
  '/',
  verifyToken,
  upload.single('photo'),
  photoController.newPhoto
);
photoRouter.put(
  '/:id',
  verifyToken,
  upload.single('photo'),
  photoController.editPhoto
);
photoRouter.delete('/:id', verifyToken, photoController.deletePhoto);

export default photoRouter;
