const {user_tags} = require("../models");
const CrudRepository = require("./crud-repository");



class UserTagRepository extends CrudRepository{
    constructor(){
        super(user_tags);
    }

    async bulkInsertTag(data){
        console.log(data);
        let response = await this.model.bulkCreate(data);
        return response;
    }

    // async findUsersByTags(tagList){
    //     return user_tags.findAll({
    //         include: [{
    //             // model: user_tags,
    //             where: {
    //                 tag: { [Op.in]: tagList },
    //                 [Op.or]: [
    //                     { expiresAt: null },
    //                     { expiresAt: { [Op.gt]: new Date() } }
    //                 ]
    //             },
    //             required: true
    //         }]
    //     });
}

module.exports = UserTagRepository;