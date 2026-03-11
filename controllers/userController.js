const User = require('../models/User');

// 1. Create User
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

// 1. Get All (có query username)
exports.getAllUsers = async (req, res) => {
    try {
        const { username } = req.query;
        let filter = { isDeleted: false };
        if (username) filter.username = { $regex: username, $options: 'i' };
        
        const users = await User.find(filter).populate('role');
        res.json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 1. Get by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
        if (!user) return res.status(404).json({ message: "Không thấy User" });
        res.json(user);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 1. Soft Delete
exports.softDeleteUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.json({ message: "Đã xóa mềm thành công" });
    } catch (err) { res.status(400).json({ error: err.message }); }
};

// 2. Enable User
exports.enableUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOneAndUpdate(
            { email, username, isDeleted: false },
            { status: true },
            { new: true }
        );
        if (!user) return res.status(400).json({ message: "Thông tin sai hoặc User không tồn tại" });
        res.json({ message: "Status -> True", data: user });
    } catch (err) { res.status(400).json({ error: err.message }); }
};

// 3. Disable User
exports.disableUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOneAndUpdate(
            { email, username, isDeleted: false },
            { status: false },
            { new: true }
        );
        if (!user) return res.status(400).json({ message: "Thông tin sai hoặc User không tồn tại" });
        res.json({ message: "Status -> False", data: user });
    } catch (err) { res.status(400).json({ error: err.message }); }
};

// 4. Get Users by Role ID
exports.getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.id, isDeleted: false });
        res.json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
};