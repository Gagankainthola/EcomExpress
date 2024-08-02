const { User } = require("../models/user");
const { sanitizeUser } = require('../services/common');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SECRET_KEY = 'SECRET_KEY';
//create user
const createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        req.login(sanitizeUser(doc), (err) => {
          // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(
              sanitizeUser(doc),
              SECRET_KEY
            );
            res
              .cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
          console.log("chal gya");
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

//logging in user
const fetchUserById = async (req, res) => {
  const user = req.user;
  res
    .cookie('jwt', user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};
const saveUserAddress = async (req, res) => {
  try {
     const {id} = req.params;
     console.log(id);
     const user =  await User.findByIdAndUpdate(id,req.body,{new:true});
     console.log(user);
      res.status(200, "success").json(user);
    } catch (err) {
      console.log(err);
      res.status(400, "error").json(err);
    }
};

const checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
const logout = async (req, res) => {
  res.cookie('jwt', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200)
};

module.exports = {createUser,fetchUserById,saveUserAddress,checkAuth,logout};
