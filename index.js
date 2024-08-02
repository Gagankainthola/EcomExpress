require('dotenv').config();
const express = require('express');
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const crypto = require('crypto');
const mongoose = require("mongoose");
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const usersRouter = require('./routes/user.js');
const {productRouter} =  require("./routes/products");
const {categoriesRouter} = require("./routes/categories");
const { brandsRouter } = require('./routes/brands');
const { authRouter } = require('./routes/auth');
const { cartRouter } = require('./routes/carts');
const {ordersRouter} = require("./routes/orders.js")
const { User } = require('./models/user.js');
const cookieParser = require('cookie-parser');
const { isAuth, sanitizeUser,cookieExtractor } = require('./services/common.js');
const server = express();
const path = require('path');


// JWT options


const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY; 

//middlewares

server.use(express.static(path.resolve(__dirname, 'build')));
//database connection
main().catch(err => console.log(err));

async function main() {

  await mongoose.connect(process.env.MONGO_DBURL);
  console.log("connected to database");

} 
//middlewares and routing

server.use(cookieParser());
server.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
}));
server.use(passport.authenticate('session'));


server.use(cors());
server.use(express.json());
server.use("/products",isAuth(),productRouter);
server.use("/category",isAuth(),categoriesRouter);
server.use('/users', isAuth(), usersRouter.router);
server.use("/brands",isAuth(),brandsRouter);
server.use("/auth",authRouter);
server.use("/cart",isAuth(),cartRouter);
server.use("/orders",isAuth(),ordersRouter);

//Passporr strategies
passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    console.log({ email, password });
    try {
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: 'invalid credentials' }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: 'invalid credentials' });
          }
          const token = jwt.sign(
            sanitizeUser(user),
            process.env.JWT_SECRET_KEY
          );
          done(null, { id: user.id, role: user.role,address:user.address,token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role ,address:user.address});
  });
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});


server.listen(process.env.PORT,()=>{
    console.log("server started");
})