const express=require('express')
const User = require('../models/user')
const router=express.Router()
const UserController = require('../controllers/user');


router.get("/users", UserController.GetAllUser)
    
    
router.post('/register', UserController.CreateNewUser)

router.put('/users/:id', UserController.UpdateUser)

router.delete('/users/:id', UserController.DeleteUserById)

router.get('/users/:id', UserController.GetUserById)

module.exports = router;