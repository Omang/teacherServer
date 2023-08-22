const express = require('express');

const router = express.Router();

const {registeruser, loginuser, logout, updateprofile, getUser} = require('../controllers/UserController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', registeruser);
router.post('/login', loginuser);
router.put('/update', authMiddleware, updateprofile);
router.post('/logout', authMiddleware, logout);
router.get('/getuser/:id', authMiddleware, getUser);


module.exports = router;