const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const GetAllUser = async (req,res)=>{
    const data =  await User.find();
    if(data){
        res.json({data})
    }
};

const CreateNewUser = async (req, res) => {
    const plainPW = req.body.password;
    
    const hashPW = await  bcrypt.hash(plainPW, saltRounds);
    req.body.password = hashPW;  
    console.log(hashPW)

    const userExist = await User.exists({phoneNumber: req.body.phoneNumber})
       

    if(userExist == null){
    const data =  User.create(req.body)
    if(data){
      res.json('user created')
    }
    }
    else {
        res.json('user already exist ')
    }
}

const UpdateUser =  async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
  }

  const DeleteUserById =  async (req, res) => {
    await User.findByIdAndDelete(req.params.id, req.body)
      }
const GetUserById =  async (req, res) => {
    const data = await User.findById(req.params.id, req.body);
    res.json({data})
    }

module.exports = {GetAllUser, CreateNewUser, UpdateUser, DeleteUserById, GetUserById};

