const mongoose = require('mongoose');

mongoose.connect("mongodb://jayesh:jayesh123@cluster0-shard-00-00.tektg.mongodb.net:27017,cluster0-shard-00-01.tektg.mongodb.net:27017,cluster0-shard-00-02.tektg.mongodb.net:27017/adminpanel?ssl=true&replicaSet=atlas-sz8p0n-shard-0&authSource=admin&retryWrites=true&w=majority",{
    }).then( () =>{
    console.log('Mongodb Connected successfully..!!')
  })
  .catch( (e)=>{
    console.log("error: ",e)
  })