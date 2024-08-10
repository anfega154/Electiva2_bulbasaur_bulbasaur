const UserRepository = require('../../../domain/repositories/UserRepository')
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

        if(await userRepository.exist(data.email,data.username)){
            throw ('user already exist')
        }
        await userRepository.create(data)
    } catch (error) {
        throw (error)
    }
}

const login = async (data) => {
    try {
        if(await !userRepository.login(data.username,data.password)){
            throw ('username or password invalid')
        }
       return await userRepository.login(data.username,data.password);
    } catch (error) {
       throw error; 
    }
}

module.exports = {
    getAll,
    add,
    login
}