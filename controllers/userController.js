const User = require('../models/User');

// Get all (có filter username includes)
exports.getAllUsers = async (req, res) => {
    try {
        const { username } = req.query;
        let query = { isDeleted: false };
        if (username) query.username = { $regex: username, $options: 'i' };
        
        const users = await User.find(query).populate('role');
        res.json(users);
    } catch (err) { res.status(500).json(err); }
};

// Enable/Disable
exports.enableUser = async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate({ email, username }, { status: true }, { new: true });
    user ? res.json({ message: "User enabled", user }) : res.status(404).send("User not found");
};

exports.disableUser = async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate({ email, username }, { status: false }, { new: true });
    user ? res.json({ message: "User disabled", user }) : res.status(404).send("User not found");
};

// Lấy user theo role id
exports.getUsersByRole = async (req, res) => {
    const users = await User.find({ role: req.params.id, isDeleted: false });
    res.json(users);
};

// Xoá mềm
exports.deleteUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "User deleted" });
};