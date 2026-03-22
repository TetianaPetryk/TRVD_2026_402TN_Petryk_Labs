const messageService = require('../services/messageService');

exports.sendMessage = async (req, res, next) => {
    try {
        const { receiverId, text } = req.body;
        const message = await messageService.sendMessage(req.user._id, receiverId, text);
        res.status(201).json({ message });
    } catch (err) {
        next(err);
    }
};

exports.getConversation = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const messages = await messageService.getConversation(req.user._id, userId);
        res.json({ messages });
    } catch (err) {
        next(err);
    }
};

exports.getMyMessages = async (req, res, next) => {
    try {
        const messages = await messageService.getUserMessages(req.user._id);
        res.json({ messages });
    } catch (err) {
        next(err);
    }
};

exports.deleteMessage = async (req, res, next) => {
    try {
        await messageService.deleteMessage(req.params.id, req.user._id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};