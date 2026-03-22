const User = require('../models/User');

class UserRepository {
    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    async addFollower(userId, followerId) {
        return await User.findByIdAndUpdate(
            userId,
            { $addToSet: { followers: followerId } },
            { new: true }
        );
    }

    async addFollowing(userId, followingId) {
        return await User.findByIdAndUpdate(
            userId,
            { $addToSet: { following: followingId } },
            { new: true }
        );
    }
}

module.exports = new UserRepository();