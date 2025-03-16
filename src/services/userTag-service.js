const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors');
const { UserTagRepository , UserRepository} = require('../repositories');
const { ErrorResponse } = require('../utils/response');

let userTagRepository = new UserTagRepository();
let userRepository = new UserRepository();


async function createUserTag(user_id, tags, expiry){
    // console.log(tags);
    try{
        const tagsArray = tags ? tags.split(',') : [];
        const expiryDate = new Date(expiry);
        for (let tag of tagsArray) {
            let User = await userTagRepository.create({
                user_id: user_id,
                tag: tag.trim(),  // Optional: Trim any extra spaces
                expiry: expiryDate
            });

        }
        
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



async function getUserTag(tags){
    try{
        const tagList = tags.split(',');
        const users = await userTagRepository.findUsersByTags(tagList);

        return users;
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