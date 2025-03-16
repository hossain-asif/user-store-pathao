const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors');
const { UserRepository } = require('../repositories');
const { ErrorResponse } = require('../utils/response');

let userRepository = new UserRepository();



async function createUser(data){
    try{
        let User = await userRepository.create(data);
        return User;

    }catch(error){
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.array.forEach((err) => {
                explanation.push(err);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can not create new User object.', StatusCodes.INTERNAL_SERVER_ERROR);

    }

}



async function getUser(id){
    try{
        let User = await userRepository.get(id);
        return User;
    }catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Not able to find the resource.", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Can not retrieved requested User object.", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}





module.exports = {
    createUser,
    getUser,
}