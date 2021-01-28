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

  //creating post
  router.post('/post/create',upload.single('file'),function(req,res){

    var user_id = req.body.id;
    var username = req.body.username
    var image = req.file.originalname;
    var title = req.body.title;
    var description = req.body.description

    db.query("INSERT INTO posts(user_id,username,image,title,description) VALUES(?,?,?,?,?)",[user_id,username,image,title,description],function(error,result){
        if(error){
            res.send(error);
        }else{
            res.send(result);
        }
    })
  })

  //getting posts
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

  //getting single post
  router.get('/post/single/:id',(req,res) =>{
    var id = req.params.id
    db.query("SELECT * FROM posts WHERE post_id='"+id+"'",function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.send(result);
        }
    })
})

  //getting post except for current user
  router.get('/posts/all/:id',(req,res) =>{
      var id=req.params.id;
      db.query("SELECT * FROM posts WHERE user_id !='"+id+"'",function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.send(result);
        }
    })
  })

  //delete post
  router.delete('/post/delete/:id',(req,res) =>{
      var id = req.params.id
      db.query("DELETE FROM posts WHERE post_id='"+id+"'",function(error,result){
          if(error){
              res.status(400).send(error);
          }else{
              res.status(200).send(result);
          }
      })
  })

  //follow user
  router.post('/follow',(req,res) =>{
      var follower_id = req.body.follower_id
      var followed_id = req.body.followed_id
      db.query("INSERT INTO follow(follower_id,followed_id) VALUES(?,?)",[follower_id,followed_id],function(error,result){
          if(error){
              res.status(400).send(error);
          }else{
              res.status(200).send(result);
          }
      })
  })

  //getting followers data
  router.get('/follow/details/:id',(req,res)=>{
      var id = req.params.id
    db.query("SELECT followed_id FROM follow WHERE follower_id='"+id+"'",function(error,result){
        if(error){
            res.status(400).send(error)
        }else{
            res.status(200).send(result)
        }
    })
  })

  //getting followed data
  router.get('/followed/details/:id',(req,res)=>{
    var id = req.params.id
  db.query("SELECT follower_id FROM follow WHERE followed_id='"+id+"'",function(error,result){
      if(error){
          res.status(400).send(error)
      }else{
          res.status(200).send(result)
      }
  })
})

//unfollow 
router.delete('/unfollow/:id&:f_id',(req,res) =>{
    var id = req.params.id;
    var f_id = req.params.f_id
    db.query("DELETE FROM follow WHERE follower_id='"+id+"' AND followed_id='"+f_id+"'",function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(result);
        }
    }) 
})

//user liked post
router.post('/liked',(req,res)=>{
    var user_id = req.body.user_id
    var post_id = req.body.post_id;
    var poster_id = req.body.poster_id
    db.query("INSERT INTO likes(user_id,post_id,poster_id) VALUES(?,?,?)",[user_id,post_id,poster_id],function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(result);
        }
    })
})

//getting liked post
router.get('/get/likes/:id',(req,res) =>{
        var post_id = req.params.id;
        db.query("SELECT * FROM likes WHERE post_id='"+post_id+"'",function(error,result){
            if(error){
                res.status(400).send(error);
            }else{
                res.status(200).send(result);
            }
        })
})

//getting particular user liked the post or not
router.get('/get/likes/user/:id&:post_id',(req,res) =>{
    var id = req.params.id;
    var post_id = req.params.post_id
    db.query("SELECT * FROM likes WHERE post_id='"+post_id+"' AND user_id='"+id+"'",function(error,result){
        if(error){
            res.status(400).send(error)
        }else{
            res.status(200).send(result);
        }
    })
})

//unlike the post
router.delete('/unlike/:id&:post_id',(req,res) =>{
    var id = req.params.id;
    var post_id = req.params.post_id;
    db.query("DELETE FROM likes WHERE user_id='"+id+"' AND post_id='"+post_id+"'",function(error,result){
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(result);
        }
    })
})

  module.exports = router