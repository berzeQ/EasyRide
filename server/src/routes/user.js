const express=require('express')
const User = require('../models/user')
const router=express.Router();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatar/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
const UserController = require('../controllers/user');


// router.get("/users", UserController.GetAllUser)
router.get('/account/:id', UserController.GetUserById)
router.post('/users-image/:id', upload.single('avatar'),UserController.uploadImage)
router.get('/users-image/:id', UserController.getUserImage)
    
router.post('/register', UserController.CreateNewUser)
router.post('/login', UserController.LoginUser)


router.put('/account/:id', UserController.UpdateUser);

// router.delete('/users/:id', UserController.DeleteUserById)


module.exports = router;    