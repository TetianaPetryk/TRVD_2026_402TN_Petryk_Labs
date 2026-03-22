const messageRepository = require('../repositories/messageRepository');

class MessageService {
    constructor(repository) {
        this.repository = repository;
    }

    async sendMessage(senderId, receiverId, text) {
        if (!text || text.trim() === '') throw new Error('Текст повідомлення не може бути порожнім');
        if (senderId === receiverId) throw new Error('Не можна надіслати повідомлення самому собі');
        return await this.repository.create({ senderId, receiverId, text });
    }

    async getConversation(user1, user2) {
        return await this.repository.findConversation(user1, user2);
    }

    async getUserMessages(userId) {
        return await this.repository.findForUser(userId);
    }

    async deleteMessage(messageId, userId) {
        return await this.repository.deleteMessage(messageId, userId);
    }
}

module.exports = new MessageService(messageRepository);