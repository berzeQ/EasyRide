const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const path = require('path')



const GetUserById =  async (req, res) => {
    const data = await User.findById(req.params.id);
    console.log(data, 'newdata')
    return res.status(200).json({data});
    }
const GetAllUser = async (req,res)=>{
    const data =  await User.find();
    if(data){
        res.json({data})
    }
};

const uploadImage = async(req, res) =>{
    console.log(req.file);
    if(req.file){
        await User.findByIdAndUpdate(req.params.id, {$set: {avatar: req.file.filename}})

    }



    res.json({msg: ' image uploaded'})
}

const getUserImage = async(req,res)=>{
    
    const userInfo =  await User.findById(req.params.id);
    const imagePath= path.join(__dirname, '../../uploads/avatar/',userInfo.avatar);
    console.log(userInfo);
    console.log(imagePath );
    res.sendFile(imagePath)
}

const CreateNewUser = async (req, res) => {
    const plainPW = req.body.password;
    console.log(req.body.password)
    
    const hashPW = await  bcrypt.hash(plainPW, saltRounds);
    req.body.password = hashPW;  
    console.log(hashPW)

    const userExist = await User.exists({phoneNumber: req.body.phoneNumber})
       
    req.body.role = "User";
    if(userExist == null){
    const data =  User.create(req.body)
    if(data){
      res.json('User has been created')
    }
    }
    else {
        res.status(409).json('User already exist ')
    }
}

const LoginUser = async (req,res) =>{
    console.log(req.body.phoneNumber)
    const userExist = await User.findOne({phoneNumber: req.body.phoneNumber});

    
    // const userExist = await User.findOne({phoneNumber: req.body.phoneNumber}).lean();
    // can use delete data.password
 


    if(userExist == null){
        res.status(404).json("User doesn't exist");
        console.log(userExist)
    }
    else{
        const isMatched = await bcrypt.compare(req.body.password, userExist.password) ;
        console.log(isMatched);
        if(isMatched){
            const token = await jwt.sign({ phoneNumber: req.body.phoneNumber}, process.env.SECRET_KEY);
            console.log(token);
            console.log(userExist)
            const mutateUser = {
                fullName : userExist.fullName,
                phoneNumber: userExist.phoneNumber,
                email: userExist.email,
                role: userExist.role,
                userCart: userExist.userCart,
                userWishList: userExist.userWishList,
                _id:userExist.id,
            }
console.log(mutateUser)

            res.status(200).json( {isLoggedIn : true , msg : "User Logged In Successfully", token, userDetails: mutateUser });

        }
        else{
            res.status(404).json("User Password doesn't match");

        }
    }
    
}

const UpdateUser =  async (req, res) => {
    console.log(req.body)
    // const prevData = await User.findOne(req.params.id, req.body);
   const data =  await User.findByIdAndUpdate(req.params.id, req.body)
   if(data){
    res.status(200).json( {msg : "User Profile Changed Successfully" });

}else{
    res.json({msg: " No change made"})
}

  };


// const DeleteUserById =  async (req, res) => {
//     await User.findByIdAndDelete(req.params.id, req.body)
//       }


module.exports = {GetAllUser, CreateNewUser, UpdateUser, GetUserById, LoginUser,uploadImage,getUserImage};

