
// declaring mongoose module
var express = require('express');

//declaring the express module

var app = express();

//declaring the cookie-parser module

var cookieParser = require('cookie-parser');

//declaring the body-parser module

var bodyParser = require('body-parser');


app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//calling the mongoose module

var mongoose = require('mongoose');



//lets define configuration of database

var dbPath = "mongodb://localhost/myblogapp" ;

// command to connect with database

 db = mongoose.connect(dbPath);

 mongoose.connection.once('open',function(){

console.log('Database connection open success');


 });//End of database command



 //include the model file
 var User = require('./blogModel.js');

 var userModel =mongoose.model('User');

 //end includes

 //including routes

 app.get('/',function(req,res){

res.send('This is a blog application');


 }); //end of get



// lets write the code to route to get all blogs

app.get('/blogs',function(req,res){
 
 userModel.find(function(err,result){

 	if(err){

 		res.send(err);
 	}
 	else{

 		res.send(result);
 	}

 });//End of user model find



 });//end of route to get all blogs


//lets write the route to get particular blog by id

 app.get('/blog/:id',function(req,res){
 
 userModel.findById({'_id':req.params.id},function(err,result){

 	if(err){
         console.log("some error");
 		res.send(err);
 	}
 	else{

 		res.send(result);
 	}

 });//End of user model findById


 });//end of route to get particular blog by id



 //lets write the route to get particular blog by username 

app.get('/blogs/:username',function(req,res){
 
 userModel.findOne({'username':req.params.username},function(err,result){

 	if(err){
         console.log("some error");
 		res.send(err);
 	}
 	else{

 		res.send(result);
 	}

 });//End of user model findOne


 });//end of route to get particular blog by username



//lets write the code to  route  create blogs

 app.post('/blog/create',function(req,res){


var newBlog = new userModel({

	name : req.body.name,
	username : req.body.username,
	password : req.body.password,
	admin : req.body.admin,
	location : req.body.location,

}); //end of newblog

var meta = {age : req.body.age , website: req.body.website};
newBlog.meta = meta ;


newBlog.save(function(error){
if(error)
{
	console.log(error);
	res.send(error);
}
else
{
	res.send(newBlog);
}

});//end of user model save



 });// end of create route



 //LETS  EDIT  A BLOG  BY ID

app.put('/blog/:id/edit',function(req,res){

var update = req.body;

userModel.findByIdAndUpdate({'_id':req.params.id},update,function(err,result){
if(err)
{
	console.log(error);
	console.log(err);
	res.send(err);
}

else
{
	res.send(result);
}


}) ;//End of user model findoneandupdate

});//end of edit route



 //LETS  EDIT A BLOG  BY USERNAME 

app.put('/blogs/:username/edit',function(req,res){

var update = req.body;

userModel.findOneAndUpdate({'username':req.params.username},update,function(err,result){
if(err)
{
	//console.log(error);
	console.log(err);
	res.send(err);
}

else
{
	res.send(result);
}


}) ;//End of user model findoneandupdate

});//end of edit route


 //LETS   DELETE A BLOG  BY ID 



app.post('/blog/:id/delete',function(req,res){

userModel.remove({'_id':req.params.id},function(err,result){
if(err)
{
	console.log("some error");
	res.send(err);
}
else{

	res.send(result);
}


});//end of user model remove



});//end of route delete


 //LETS  DELETE A BLOG  BY USERNAME


app.post('/blogs/:username/delete',function(req,res){

userModel.findOneAndRemove({'username':req.params.username},function(err,result){
if(err)
{
	console.log("some error");
	res.send(err);
}
else{

	res.send(result);
}


});//end of user model remove



});//end of route delete



// TO CONNECT THE PORT TO LOCALHOST

 app.listen(3000,function(){

	console.log("port is conecting on localhost 3000");


});

//end of port


