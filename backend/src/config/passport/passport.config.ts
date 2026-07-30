import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { constant } from '../constant/constant.js';
import { AuthService } from '../../services/auth.service.js';

// ----- Google Strategy -----
passport.use(
  new GoogleStrategy(
    {
      clientID: constant.GOOGLE_CLIENT_ID,
      clientSecret: constant.GOOGLE_CLIENT_SECRET,
      callbackURL: constant.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    },
    // Verify callback.
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await AuthService.socicalLogin('google', profile);
        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

export default passport;
// Other stratefy in the future goes here.
