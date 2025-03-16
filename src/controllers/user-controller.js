
const { StatusCodes } = require('http-status-codes');
const {UserService} = require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/response');


async function createUser(req, res){
    try {
        let response = await UserService.createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            phone: req.body.phone
        });

        SuccessResponse.message = "successfully created.";
        SuccessResponse.data = {
            id: response
        };

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






async function getUser(req, res){
    try {
        let response = await UserService.getUser(req.params.id);

        SuccessResponse.message = "successfully fetched.";
        SuccessResponse.data = {
            id: response.id,
            name: response.firstName+" "+response.lastName,
            phone: response.phone
        };

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
    createUser,
    getUser
}