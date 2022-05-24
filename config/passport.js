import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

function passportConfig(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({
          username: username,
        });

        if (!user) {
          return done(null, false);
        }

        //verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
}

export { passportConfig };
