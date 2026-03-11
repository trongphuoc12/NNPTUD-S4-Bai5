const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/', userCtrl.createUser);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUserById);
router.delete('/:id', userCtrl.softDeleteUser);

// Các route đặc biệt theo yêu cầu bài tập
router.post('/enable', userCtrl.enableUser);
router.post('/disable', userCtrl.disableUser);

module.exports = router;