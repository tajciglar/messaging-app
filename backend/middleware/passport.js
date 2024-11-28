const passport = require("passport");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const jwtSecret = process.env.JWT_SECRET


passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret
        },
        async (payload, done) => {
            console.log('JWT Payload:', payload); // Log the JWT payload

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: payload.id 
                    }
                });

                if (!user) {
                    console.log('User not found');
                    return done(null, false, { message: "User not found" });
                }

                return done(null, user); // If the user is found, pass it to the next middleware
            } catch (err) {
                console.error('Error in JWT strategy:', err);
                return done(err);
            }
        }
    )
);

module.exports = passport;