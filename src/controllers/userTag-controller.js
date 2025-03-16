
const { StatusCodes } = require('http-status-codes');
const {UserTagService} = require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/response');


async function createUserTag(req, res){
    try {
        console.log(req.params.id);
        const response = await UserTagService.createUserTag(req.params.id, req.body.tags, req.body.expiry);

        SuccessResponse.message = "successfully created.";
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Failed to create.";
        return res
                .status(error.statusCodes || StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
}






async function getUserTag(req, res){
    try {
        console.log(req.query.tags);
        const response = await UserTagService.getUserTag(req.query.tags);

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Failed to fetched.";
        return res
                .status(error.StatusCodes || StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
}






module.exports = {
    createUserTag,
    getUserTag
}