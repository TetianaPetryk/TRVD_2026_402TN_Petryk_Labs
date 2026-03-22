const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async register(username, email, password) {
        const existing = await this.repository.findByEmail(email);
        if (existing) throw new Error('Ця електронна адреса вже використовується');

        const hashed = await bcrypt.hash(password, 10);
        const user = await this.repository.create({ username, email, password: hashed });
        return this._sanitizeUser(user);
    }

    async login(email, password) {
        const user = await this.repository.findByEmail(email);
        if (!user) throw new Error('Невірний email або пароль');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Невірний email або пароль');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return { user: this._sanitizeUser(user), token };
    }

    async getUserById(id) {
        const user = await this.repository.findById(id);
        if (!user) throw new Error('Користувача не знайдено');
        return this._sanitizeUser(user);
    }

    async updateProfile(userId, data) {
        const allowed = ['username', 'avatar'];
        const updateData = {};
        for (const key of allowed) {
            if (data[key] !== undefined) updateData[key] = data[key];
        }
        const updated = await this.repository.update(userId, updateData);
        return this._sanitizeUser(updated);
    }

    async followUser(currentUserId, targetUserId) {
        if (currentUserId === targetUserId) throw new Error('Не можна підписатися на самого себе');

        const target = await this.repository.findById(targetUserId);
        if (!target) throw new Error('Користувача для підписки не знайдено');

        await this.repository.addFollowing(currentUserId, targetUserId);
        await this.repository.addFollower(targetUserId, currentUserId);

        return { message: 'Підписка виконана успішно' };
    }

    _sanitizeUser(user) {
        if (!user) return null;
        const userObj = user.toObject ? user.toObject() : user;
        const { password, ...safeUser } = userObj;
        return safeUser;
    }
}

module.exports = new UserService(userRepository);