const User = require('../models/user');



const GetAllUser = async (req,res)=>{
    const data =  await User.find();
    if(data){
        res.json({data})
    }
};

const CreateNewUser = async (req, res) => {
    const data = await User.create(req.body)
    if(data){
      res.json
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

