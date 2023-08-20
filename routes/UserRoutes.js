const express = require('express');

const router = express.Router();

const {registeruser, loginuser, logout, updateprofile} = require('../controllers/UserController');

router.post('/register', registeruser);
router.post('/login', loginuser);
router.put('/update', updateprofile);
router.get('/logout', logout);


module.exports = router;