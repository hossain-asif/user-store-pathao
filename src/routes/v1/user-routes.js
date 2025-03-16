const express = require('express');
const { UserController, UserTagController } = require('../../controllers');


const router = express.Router();

// router.get('/', (req, res) => {
//     res
//     .status(200)
//     .json({ message: 'User route works!' });
// });



// /api/v1/users POST
router.post('/',
    UserController.createUser);


    
// /api/v1/users/:id GET
router.get('/:id',
    UserController.getUser);



// /api/v1/users/id POST
router.post('/users/:id/tags',
    UserTagController.createUser);







module.exports = router;