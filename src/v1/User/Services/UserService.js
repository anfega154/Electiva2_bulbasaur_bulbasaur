const UserRepository = require('../Repository/UserRepository')
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
            throw ('user already exist');
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


module.exports = {
    getAll,
    add
}