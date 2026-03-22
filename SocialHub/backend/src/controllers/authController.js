const userService = require('../services/userService');
const UserDTO = require('../dtos/userDto');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await userService.register(username, email, password);
        res.status(201).json({ user: new UserDTO(user) });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.login(email, password);
        res.json({ user: new UserDTO(user), token });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user._id);
        res.json({ user: new UserDTO(user) });
    } catch (err) {
        next(err);
    }
};