// router.post('/user/file',upload.single('file'),(req,res) =>{
//     var image = req.file.originalname;
//     var signup_id = req.body.signup_id;
//     db.query('INSERT INTO profile(signup_id,profile_image) VALUES(?,?)',[signup_id,image],function(error,result){
//         if(error){
//             res.send(error);
//         }else{
//             res.send("success");
//         }
//     })
// })

// //get profile pic
// router.get('/user/image/:id',function(req,res){
//     var id = req.params.id;
//     db.query("SELECT * FROM profile WHERE signup_id='"+id+"'",function(error,result){
//         if(error){
//             res.status(400).send(error)
//         }else{
//             res.send(result);
//         }
//     })
// })