const express = require('express');
const { fetchUserById} = require('../controllers/users');

const router = express.Router();
//  /users is already added in base path
router.get('/own', fetchUserById)

exports.router = router;