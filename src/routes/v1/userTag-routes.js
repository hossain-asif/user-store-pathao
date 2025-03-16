const express = require('express');
const { UserTagController } = require('../../controllers');


const router = express.Router();




// /api/v1/user POST
router.post('/',
    UserTagController.createUser);


    
// /api/v1/user/:id GET
router.get('/:id',
    UserTagController.getUser);





module.exports = router;