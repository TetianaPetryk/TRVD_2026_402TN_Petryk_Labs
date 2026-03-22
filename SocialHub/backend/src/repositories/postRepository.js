const Post = require('../models/Post');

class PostRepository {
    async findById(id) {
        return await Post.findById(id).populate('userId', 'username avatar');
    }

    async findByUserId(userId) {
        return await Post.find({ userId }).sort({ createdAt: -1 }).populate('userId', 'username avatar');
    }

    async findAll(skip = 0, limit = 20) {
        return await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'username avatar');
    }

    async create(postData) {
        const post = new Post(postData);
        return await post.save();
    }

    async update(id, data) {
        return await Post.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Post.findByIdAndDelete(id);
    }

    async addComment(postId, commentData) {
        return await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: commentData } },
            { new: true }
        ).populate('comments.userId', 'username avatar');
    }

    async toggleLike(postId, userId) {
        const post = await Post.findById(postId);
        if (!post) throw new Error('Публікацію не знайдено');

        const index = post.likes.indexOf(userId);
        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(index, 1);
        }
        await post.save();
        return post;
    }
}

module.exports = new PostRepository();