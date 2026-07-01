import express from 'express';

const authRouter = express.Router();

authRouter.get('/login', (req, res) => {
  console.log(req.headers);
  res.send('Login API!');
});
authRouter.get('/signup', (req, res) => {
  res.send('Signup API!');
});

export default authRouter;
