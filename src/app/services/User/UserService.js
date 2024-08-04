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

        if(await userRepository.exist(data.email)){
            throw ('el usario ya se encuentra registrado')
        }
        await userRepository.create(data)
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getAll,
    add
}