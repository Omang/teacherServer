const express = require('express');

const router = express.Router();

const {NewApp, RenewApp, viewApp, CorrectApp, getsms, GetuserSms,
 approveapp, userApp, LicensePay, 
 AppPay, allLicense, pendingdocs, approveddocs} = require('../controllers/LicenseController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/new', authMiddleware, NewApp);
router.put('/renew', authMiddleware, RenewApp);
router.get('/view/:id', authMiddleware, viewApp);
router.post('/correctapp', authMiddleware, isAdmin, CorrectApp);
router.get('/getsms/:id', authMiddleware, getsms);
router.post('/usersms', authMiddleware, GetuserSms);
router.put('/approveapp', authMiddleware, isAdmin, approveapp);
router.get('/getapp/:id', authMiddleware, userApp);
router.put('/paylicense', authMiddleware, LicensePay);
router.put('/payapplication', authMiddleware, AppPay);
router.get('/alllicenses/:id', authMiddleware, isAdmin, allLicense);
router.post('/getpending', pendingdocs);
router.post('/getapproved', approveddocs);

module.exports = router;
