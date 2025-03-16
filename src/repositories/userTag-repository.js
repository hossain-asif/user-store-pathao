const {user_tags} = require("../models");
const CrudRepository = require("./crud-repository");



class UserTagRepository extends CrudRepository{
    constructor(){
        super(user_tags);
    }

    async bulkInsertTag(data){
        let response = await this.model.bulkCreate(data);
        return response;
    }
}

module.exports = UserTagRepository;