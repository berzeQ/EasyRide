const express = require('express')
const app = express()
const connect = require('./DB/connect');
const User = require('./models/user')
const cors = require('cors');
app.use(express.json());
app.use(cors())

connect();
require('dotenv').config();
const port = process.env.PORT;

const userRoute=require('./routes/user');

const contactRoute=require('./routes/contac');
  

app.use(userRoute);
app.use("/contact",contactRoute )




app.listen(port, () => {
  console.log(`Server is running on localhost ${port}`)
})