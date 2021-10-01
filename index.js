var express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

require('./database/db');

//handle cors-policy
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//body-parser
app.use(express.json());

app.use('/upload',express.static(path.join("upload")));


const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');


const port =process.env.PORT || 3001;

app.use('/user',userRoutes);
app.use('/product',productRoutes);


app.listen(port,() => {
    console.log(`server is running at ${port}...`)
})
