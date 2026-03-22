const postRepository = require('../repositories/postRepository');

class PostService {
    constructor(repository) {
        this.repository = repository;
    }

    async createPost(userId, content) {
        if (!content || content.trim() === '') throw new Error('Текст публікації не може бути порожнім');
        return await this.repository.create({ userId, content });
    }

    async getPostById(postId) {
        const post = await this.repository.findById(postId);
        if (!post) throw new Error('Публікацію не знайдено');
        return post;
    }

    async getUserPosts(userId) {
        return await this.repository.findByUserId(userId);
    }

    async getFeed(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        return await this.repository.findAll(skip, limit);
    }

    async updatePost(postId, userId, content) {
        const post = await this.repository.findById(postId);
        if (!post) throw new Error('Публікацію не знайдено');
        if (!post.userId.equals(userId)) throw new Error('Немає прав для редагування цієї публікації');
        if (!content || content.trim() === '') throw new Error('Текст публікації не може бути порожнім');
        return await this.repository.update(postId, { content });
    }

    async deletePost(postId, userId) {
        const post = await this.repository.findById(postId);
        if (!post) throw new Error('Публікацію не знайдено');
        if (!post.userId.equals(userId)) throw new Error('Немає прав для видалення цієї публікації');
        return await this.repository.delete(postId);
    }

    async addComment(postId, userId, text) {
        if (!text || text.trim() === '') throw new Error('Текст коментаря не може бути порожнім');
        return await this.repository.addComment(postId, { userId, text });
    }

    async likePost(postId, userId) {
        return await this.repository.toggleLike(postId, userId);
    }
}

module.exports = new PostService(postRepository);