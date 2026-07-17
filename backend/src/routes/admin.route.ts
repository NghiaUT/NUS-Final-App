import express from 'express';
import { adminController } from '../controllers/admin.controller.js';
import {
  checkPermission,
  verifyToken,
} from '../middlewares/auth.middleware.js';
import upload from '../config/multer/multer.config.js';

const adminRouter = express.Router();

adminRouter.use(verifyToken);
adminRouter.use(checkPermission(['ADMIN']));

adminRouter.get('/users', adminController.getUsers);
adminRouter.get('/users/:id', adminController.getUser);
adminRouter.put(
  '/users/:id/profile',
  upload.single('avatar'),
  adminController.updateUser
);
adminRouter.delete('/users/:id', adminController.deleteUser);

adminRouter.get('/photos', adminController.getPhotos);
adminRouter.get('/photos/:id', adminController.getPhoto);
adminRouter.put('/photos/:id', adminController.editPhoto);
adminRouter.delete('/photos/:id', adminController.deletePhoto);

adminRouter.get('/albums', adminController.getAlbums);
adminRouter.get('/albums/:id', adminController.getAlbum);
adminRouter.put('/albums/:id', adminController.editAlbum);
adminRouter.delete('/albums/:id', adminController.deleteAlbum);

export default adminRouter;
