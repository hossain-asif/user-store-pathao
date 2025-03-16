
const {AppError} = require('../utils/errors');
const { StatusCodes } = require('http-status-codes');

class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        console.log(data);
        let response = await this.model.create(data);
        console.log(response.data);
        return response.dataValues.id;
    }

    async destroy(data){
        let response = await this.model.destroy({
            where:{
                id:data
            }
        });
        // console.log(response);

        if(response == 0){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
        }
        return response;
    }
    async get(data){
        let response = await this.model.findByPk(data);
        if(response == null){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response.dataValues;
    }

    async getAll(){
        let response = await this.model.findAll();
        return response;
    }

    async update(id, data){
        let response = await this.model.update(data, {
            where: {
                id: id
            }
        });

        if(response == null){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

}

module.exports = CrudRepository;