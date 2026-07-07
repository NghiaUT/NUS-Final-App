import express from 'express';
import { photoController } from '../controllers/photo.controller.js';
import upload from '../config/multer/multer.config.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const photoRouter = express.Router();

photoRouter.get('/', photoController.getAllPhoto);
photoRouter.post(
  '/',
  verifyToken,
  upload.single('photo'),
  photoController.newPhoto
);
photoRouter.get('/:id', verifyToken, photoController.getPhoto);
photoRouter.put(
  '/:id',
  verifyToken,
  upload.single('photo'),
  photoController.editPhoto
);
photoRouter.delete('/:id', verifyToken, photoController.deletePhoto);

export default photoRouter;
