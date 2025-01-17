const express = require('express');
const router = express.Router();
const { updatePersonalDetails, getPersonalDetails } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.put('/personal-details', auth, updatePersonalDetails);
router.get('/personal-details', auth, getPersonalDetails);

module.exports = router;