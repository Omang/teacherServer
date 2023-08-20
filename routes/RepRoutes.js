const express = require('express');
const router = express.Router();
const {Addrep, UserReps, ViewRep, DeleteRep, addschool, addteacher, allschools, schoolteachers} = require('../controllers/RepController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/addrep', authMiddleware, Addrep );
router.get('/getreps', authMiddleware, UserReps);
router.get('/viewrep/:id', authMiddleware, ViewRep);
router.get('/deleterep/:id', authMiddleware, isAdmin, DeleteRep);
router.post('/addschool', authMiddleware, isAdmin, addschool);
router.get('/allschool', authMiddleware, isAdmin, allschools);
router.put('/addteacher/:id', authMiddleware, addteacher);
router.get('/schooltechers', authMiddleware, schoolteachers);

module.exports = router;