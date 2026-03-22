const postService = require('../services/postService');
const PostDTO = require('../dtos/postDto');

exports.createPost = async (req, res, next) => {
    try {
        const post = await postService.createPost(req.user._id, req.body.content);
        res.status(201).json({ post: new PostDTO(post) });
    } catch (err) {
        next(err);
    }
};

exports.getUserPosts = async (req, res, next) => {
    try {
        const posts = await postService.getUserPosts(req.params.userId);
        res.json({ posts: posts.map(p => new PostDTO(p)) });
    } catch (err) {
        next(err);
    }
};

exports.getFeed = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const posts = await postService.getFeed(page, limit);
        res.json({ posts: posts.map(p => new PostDTO(p)) });
    } catch (err) {
        next(err);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.json({ post: new PostDTO(post) });
    } catch (err) {
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await postService.updatePost(req.params.id, req.user._id, req.body.content);
        res.json({ post: new PostDTO(post) });
    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        await postService.deletePost(req.params.id, req.user._id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

exports.addComment = async (req, res, next) => {
    try {
        const post = await postService.addComment(req.params.postId, req.user._id, req.body.text);
        res.json({ post: new PostDTO(post) });
    } catch (err) {
        next(err);
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const post = await postService.likePost(req.params.postId, req.user._id);
        res.json({ post: new PostDTO(post) });
    } catch (err) {
        next(err);
    }
};