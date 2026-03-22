const Message = require('../models/Message');

class MessageRepository {
    async create(messageData) {
        const message = new Message(messageData);
        return await message.save();
    }

    async findConversation(user1, user2) {
        return await Message.find({
            $or: [
                { senderId: user1, receiverId: user2 },
                { senderId: user2, receiverId: user1 },
            ],
        }).sort({ createdAt: 1 });
    }

    async findForUser(userId) {
        return await Message.find({
            $or: [{ senderId: userId }, { receiverId: userId }],
        }).sort({ createdAt: -1 });
    }

    async deleteMessage(messageId, userId) {
        const message = await Message.findOne({ _id: messageId, senderId: userId });
        if (!message) throw new Error('Повідомлення не знайдено');
        return await message.deleteOne();
    }
}

module.exports = new MessageRepository();