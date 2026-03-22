class PostDTO {
    constructor(post) {
        this.id = post._id;
        this.userId = post.userId?._id || post.userId;
        this.username = post.userId?.username;
        this.userAvatar = post.userId?.avatar;
        this.content = post.content;
        this.likesCount = post.likes ? post.likes.length : 0;
        this.comments = (post.comments || []).map(comment => ({
            id: comment._id,
            userId: comment.userId?._id || comment.userId,
            username: comment.userId?.username,
            text: comment.text,
            createdAt: comment.createdAt,
        }));
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
    }
}

module.exports = PostDTO;