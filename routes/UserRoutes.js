const express = require('express');

const router = express.Router();

const {registeruser, loginuser, logout, updateprofile} = require('../controllers/UserController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', registeruser);
router.post('/login', loginuser);
router.put('/update', authMiddleware, updateprofile);
router.get('/logout', authMiddleware, logout);


module.exports = router;