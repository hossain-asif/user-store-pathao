const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors');
const { UserTagRepository } = require('../repositories');
const { ErrorResponse } = require('../utils/response');

let userTagRepository = new UserTagRepository();



async function createUserTag(user_id, tags, expiry){
    try{
        const tagEntries = tags.map(tag => ({
            user_id,
            tag,
            expiresAt: expiry ? new Date(Date.now() + expiry) : null
        }));
        let User = await userTagRepository.bulkInsertTag(tagEntries);
        return User;

    }catch(error){
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.array.forEach((err) => {
                explanation.push(err);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can not create new User Tag object.', StatusCodes.INTERNAL_SERVER_ERROR);

    }

}



async function getUserTag(id){
    try{
        let User = await userTagRepository.get(id);
        return User;
    }catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Not able to find the resource.", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Can not retrieved requested User Tag object.", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}





module.exports = {
    createUserTag,
    getUserTag,
}