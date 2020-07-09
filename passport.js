var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  const passportJWT = require("passport-jwt");
var UserService = require('./service/userService')
const JWTStrategy  = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt



passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {

    return UserService.findById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));
module.exports=passport