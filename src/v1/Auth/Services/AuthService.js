const UserRepository = require('../../User/Repository/UserRepository')
const bcrypt = require('bcrypt');
const userRepository = new UserRepository();


const login = async (data) => {
    try {
        const user = await userRepository.findByUsername(data.username);
        if (!user) {
            throw ('username or password invalid')
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        
        if (!isPasswordValid) {
            throw ('username or password invalid');
        }

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login
}