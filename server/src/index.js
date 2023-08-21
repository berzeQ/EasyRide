const express = require('express')
const app = express()
const mongoose = require('mongoose');
const { Schema } = mongoose;
const port = 3005
app.use(express.json())
const users=[
  {id: 3, name:'sari'},
  {id: 1, name:'ram'},
  {id: 2, name:'shiva'},
]
 
 
const connect = async()=> {
  try{
   const res = await  mongoose.connect('mongodb://127.0.0.1:27017/easyride');
   if(res) console.log("connected to mongodb")
  }catch(err){
    console.log(err)
  }
 
}
connect()
 
const userSchema = new Schema({
  fullName: String,
  phoneNumber: Number,
  email: String,
  password: String,
  online: Boolean
});
 
const User = mongoose.model('User', userSchema);
 
app.post('/register', async (req, res) => {
const data = await User.create(req.body)
if(data){
  res.json
}
})
 
 
app.put('/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body)
})
 
app.delete('/users/:id', async (req, res) => {
await User.findByIdAndDelete(req.params.id, req.body)
  })
 
 
app.get('/users/:id', async (req, res) => {
await User.findByIdAndUpdate(req.params.id, req.body)
})
 
 
  
 
 
app.listen(port, () => {
  console.log(`Server is running on localhost ${port}`)
})