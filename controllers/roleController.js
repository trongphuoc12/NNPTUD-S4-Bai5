const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.getAllRoles = async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
};