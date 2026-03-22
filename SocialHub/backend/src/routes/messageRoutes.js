const express = require('express');
const {
    sendMessage,
    getConversation,
    getMyMessages,
    deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');
const { validateMessage } = require('../middlewares/validators');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Ендпоїнти обміну повідомленнями
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Надіслати повідомлення
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - text
 *             properties:
 *               receiverId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Повідомлення надіслано
 */
router.post('/', validateMessage, sendMessage);

/**
 * @swagger
 * /messages/me:
 *   get:
 *     summary: Отримати всі повідомлення поточного користувача
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список повідомлень
 */
router.get('/me', getMyMessages);

/**
 * @swagger
 * /messages/conversation/{userId}:
 *   get:
 *     summary: Отримати переписку між поточним та іншим користувачем
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Повідомлення переписки
 */
router.get('/conversation/:userId', getConversation);

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Видалити повідомлення (тільки відправник)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Повідомлення видалено
 */
router.delete('/:id', deleteMessage);

module.exports = router;