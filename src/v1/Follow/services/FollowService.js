const UserRepository = require('../../User/Repository/UserRepository')
const bcrypt = require('bcrypt');
const userRepository = new UserRepository();

const follow = async (followerId, followingId) => {
    try {
        const follower = await userRepository.getById(followerId);
        if (!follower) {
            throw new Error('Follower not found');
        }

        const following = await userRepository.getById(followingId);
        if (!following) {
            throw new Error('User to follow not found');
        }

        if (follower.id === following.id) {
            throw new Error('A user cant follow themselves');
        }

        await userRepository.followUser(followerId, followingId);
        let message = `${follower.username} now is following ${following.username}`;
        return message
    } catch (error) {
        console.error('Error in followUser:', error);
        throw error
    }
};

const count = async (userId) => {
    try {
        const followers= await userRepository.getFollowerCount(userId)
        const following = await userRepository.getFollowingCount(userId)
        return {
            "followers":followers,
            "following":following
        }
    } catch (error) {
        console.error('Error counting:', error);
        throw error
    }
}

const getFollower = async (userId) => {
    try {
        return userRepository.getFollowers(userId)
    } catch (error) {
        console.error('Error counting:', error);
        throw error
    }
}

const getFollowings = async (userId) => {
    try {
        return userRepository.getFollowing(userId)
    } catch (error) {
        console.error('Error counting:', error);
        throw error
    }
}
module.exports = {
    follow,
    count,
    getFollower,
    getFollowings
}
