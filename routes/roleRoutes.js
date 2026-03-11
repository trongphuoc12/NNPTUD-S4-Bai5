const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const userCtrl = require('../controllers/userController'); // Import để dùng hàm câu 4

// Viết nhanh CRUD Role tại đây hoặc tách controller tương tự User
router.post('/', async (req, res) => {
    const role = await Role.create(req.body);
    res.json(role);
});

router.get('/', async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
});

// Câu 4: /roles/:id/users
router.get('/:id/users', userCtrl.getUsersByRole);

module.exports = router;