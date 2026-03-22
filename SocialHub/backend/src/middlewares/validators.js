const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('username')
        .isLength({ min: 3 })
        .withMessage('Ім’я користувача має містити принаймні 3 символи')
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Введіть коректну електронну адресу')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Пароль має містити принаймні 6 символів'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Введіть коректну електронну адресу')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Пароль обов’язковий'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validatePost = [
    body('content')
        .notEmpty()
        .withMessage('Текст публікації не може бути порожнім')
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateComment = [
    body('text')
        .notEmpty()
        .withMessage('Текст коментаря не може бути порожнім')
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateMessage = [
    body('text')
        .notEmpty()
        .withMessage('Текст повідомлення не може бути порожнім')
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateRegister,
    validateLogin,
    validatePost,
    validateComment,
    validateMessage,
};