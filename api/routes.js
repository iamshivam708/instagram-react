const express = require('express');
const router = express.Router();
const db = require('./Db')
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

//signup
router.post('/signup',upload.single('file'),(req,res) =>{
    var username = req.body.username;
    var fullname = req.body.fullname;
    var email = req.body.email;
    var password = req.body.password;
    var profile = req.file.originalname;
    db.query("INSERT INTO signup(profile,email,fullname,username,password) VALUES(?,?,?,?,?)",[profile,email,fullname,username,password],function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(result);
        }
    })
})

//login
router.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    db.query("SELECT * FROM signup WHERE email='"+email+"' AND password='"+password+"'",function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.send(result);
        }
    })
})

//signup geting
router.get('/get/details/:id',(req,res) =>{
  var id = req.params.id
  db.query("SELECT * FROM signup WHERE signup_id != '"+id+"'",function(error,result){
    if(error){
      res.status(400).send(error);
    }else{
      res.status(200).send(result)
    }
  })
})

//signup details
router.get('/signup/details/:id',function(req,res){
    var id = req.params.id;
    db.query("SELECT * FROM signup WHERE signup_id='"+id+"'",function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.send(result);
        }
    })
})

//update user
router.put('/User/update',upload.single('file'),function(req,res){
    var username = req.body.username;
    var fullname = req.body.fullname;
    var id = req.body.id;
    var profile = req.file.originalname
    db.query("UPDATE signup SET profile='"+profile+"', username='"+username+"',fullname='"+fullname+"' WHERE signup_id='"+id+"' ",function(result,error){
      if(!error){
        res.status(400).send(error);
      }else{
        res.send("success");
      }
    })
  })

module.exports = router