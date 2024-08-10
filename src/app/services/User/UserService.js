const UserRepository = require('../../../domain/repositories/UserRepository')
const bcrypt = require('bcrypt');
const userRepository = new UserRepository();


const getAll = async () => {
    try {
        return await userRepository.getAll();
    } catch (error) {
        throw (error);
    }
}

const add = async (data) => {
    try {
        const isCreated = await userRepository.exist(data.email, data.username)
        if(isCreated != null){
            throw Error('user already exist');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newData = {
            ...data,
            password: hashedPassword
        };
        await userRepository.create(newData);
    } catch (error) {
        throw error;
    }
}

const login = async (data) => {
    try {
        const user = await userRepository.findByUsername(data.username);
        
        if (!user) {
            throw new Error('username or password invalid');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('username or password invalid');
        }

        return user;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAll,
    add,
    login
}