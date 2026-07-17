import express from 'express';
import { albumController } from '../controllers/album.controller.js';
import {
  optionalVerifyToken,
  verifyToken,
} from '../middlewares/auth.middleware.js';
import upload from '../config/multer/multer.config.js';

const albumRouter = express.Router();

albumRouter.get(
  '/discover',
  optionalVerifyToken,
  albumController.getAllAlbumDiscover
);
albumRouter.get('/feed', verifyToken, albumController.getAllAlbumFeed);
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
albumRouter.post('/:id/like', verifyToken, albumController.likeAlbum);
albumRouter.delete('/:id/like', verifyToken, albumController.unlikeAlbum);
export default albumRouter;
