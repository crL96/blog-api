const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = require("./prisma");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_JWT_SECRET,
}

passport.use(new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        if (user) return done(null, user);
        else return done(null, false);
    } catch (error) {
        done(error, false)
    }
}));

module.exports = passport;



