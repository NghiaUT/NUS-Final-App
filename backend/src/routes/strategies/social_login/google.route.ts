import express from 'express';
import passport from 'passport';
import issueTokenAndRedirect from './redirect.helper.js';

const googleRouter = express.Router();

googleRouter.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

googleRouter.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: `/api/login-failed`,
    session: false,
  }),
  issueTokenAndRedirect
);

export default googleRouter;
