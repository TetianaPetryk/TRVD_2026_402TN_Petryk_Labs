const express = require('express');
const {
    createPost,
    getUserPosts,
    getFeed,
    getPostById,
    updatePost,
    deletePost,
    addComment,
    likePost,
} = require('../controllers/postController');
const { protect } = require('../middlewares/auth');
const { validatePost, validateComment } = require('../middlewares/validators');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Управління публікаціями
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Створити нову публікацію
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Публікацію створено
 */
router.post('/', validatePost, createPost);

/**
 * @swagger
 * /posts/feed:
 *   get:
 *     summary: Отримати стрічку публікацій
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список публікацій
 */
router.get('/feed', getFeed);

/**
 * @swagger
 * /posts/user/{userId}:
 *   get:
 *     summary: Отримати публікації користувача за ID
 *     tags: [Posts]
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
 *         description: Публікації користувача
 */
router.get('/user/:userId', getUserPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Отримати одну публікацію за ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Деталі публікації
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Оновити публікацію
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Публікацію оновлено
 */
router.put('/:id', validatePost, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Видалити публікацію
 *     tags: [Posts]
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
 *         description: Публікацію видалено
 */
router.delete('/:id', deletePost);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Додати коментар до публікації
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Коментар додано
 */
router.post('/:postId/comments', validateComment, addComment);

/**
 * @swagger
 * /posts/{postId}/like:
 *   post:
 *     summary: Поставити або зняти лайк
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Лайк змінено
 */
router.post('/:postId/like', likePost);

module.exports = router;