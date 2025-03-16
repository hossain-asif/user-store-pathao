const {user_tags, User} = require("../models");
const CrudRepository = require("./crud-repository");
const { Op } = require("sequelize");




class UserTagRepository extends CrudRepository{
    constructor(){
        super(user_tags);
    }

    async findUsersByTags(tagList) {
        try {
            const result = await user_tags.findAll({
                where: {
                    tag: { [Op.in]: tagList },
                    [Op.or]: [
                        { expiry: null },
                        { expiry: { [Op.gt]: new Date() } }
                    ]
                },
                include: [{
                    model: User,
                    as: 'user_detail',
                    required: true 
                }]
            });

            return result;
        } catch (error) {
            console.error("Error fetching users by tags:", error);
            throw new Error("Error fetching users");
        }
    }
}

module.exports = UserTagRepository;