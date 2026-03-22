const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB підключено успішно!');
    } catch (err) {
        console.error('MongoDB помилка підключення:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;