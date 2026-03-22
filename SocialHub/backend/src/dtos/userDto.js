class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.avatar = user.avatar;
        this.followersCount = user.followers ? user.followers.length : 0;
        this.followingCount = user.following ? user.following.length : 0;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDTO;