import express from 'express';
import { albumController } from '../controllers/album.controller.js';

const albumRouter = express.Router();

albumRouter.post('/', albumController.newAlbum);
albumRouter.put('/:id', albumController.editAlbum);
albumRouter.delete('/:id', albumController.deleteAlbum);

export default albumRouter;
