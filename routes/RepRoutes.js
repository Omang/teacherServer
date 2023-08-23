const express = require('express');
const router = express.Router();
const {Addrep, UserReps, ViewRep, DeleteRep, addschool, addteacher, allschools, schoolteachers, getSchool} = require('../controllers/RepController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/addrep', authMiddleware, Addrep );
router.get('/getreps', authMiddleware, UserReps);
router.get('/viewrep/:id', authMiddleware, ViewRep);
router.get('/deleterep/:id', authMiddleware, isAdmin, DeleteRep);
router.post('/addschool', authMiddleware, isAdmin, addschool);
router.post('/allschool', authMiddleware, isAdmin, allschools);
router.put('/addteacher', authMiddleware, addteacher);
router.get('/schooltechers/:id', authMiddleware, schoolteachers);
router.get('/getschool/:id', authMiddleware, getSchool);

module.exports = router;