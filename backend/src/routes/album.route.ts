import express from 'express';
import { albumController } from '../controllers/album.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import upload from '../config/multer/multer.config.js';

const albumRouter = express.Router();

albumRouter.get('/', albumController.getAllAlbum);
albumRouter.post(
  '/',
  verifyToken,
  upload.array('album', 25),
  albumController.newAlbum
);
albumRouter.get('/:id', verifyToken, albumController.getAlbum);
albumRouter.put(
  '/:id',
  verifyToken,
  upload.array('album', 25),
  albumController.editAlbum
);
albumRouter.delete('/:id', verifyToken, albumController.deleteAlbum);

export default albumRouter;
