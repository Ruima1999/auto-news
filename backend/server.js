const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

    
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("success" ))
  .catch(err => console.log(err));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://auto-news-summary:auto-news-summary@cluster0.jgtrr.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, function(err,db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("users").find({},{ projection: { _id: 0,username:0,createdAt:0, updatedAt:0,__v:0 } }).toArray(function(err, result) {
    if (err) throw err;
    
    fs.writeFileSync("email.txt",JSON.stringify(result) );
    
    
  });
});






  //.then(() => console.log("success" ))
  //.catch(err => console.log(err));

 //const g = db.collection("users").find().toArray();
  //console.log(g);



//const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
