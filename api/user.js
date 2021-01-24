const express = require('express');
const router = express.Router();
const db = require('./Db')
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images/posts')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

  router.post('/post/create',upload.single('file'),function(req,res){

    var user_id = req.body.id;
    var image = req.file.originalname;
    var title = req.body.title;
    var description = req.body.description

    db.query("INSERT INTO posts(user_id,image,title,description) VALUES(?,?,?,?)",[user_id,image,title,description],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
  })

  router.get('/posts/:id',(req,res) =>{
      var id = req.params.id
      db.query("SELECT * FROM posts WHERE user_id='"+id+"'",function(error,result){
          if(error){
              res.status(400).send(error);
          }else{
              res.send(result);
          }
      })
  })

  module.exports = router