const express=require('express');
const router =express.Router();
const gravatar=require('gravatar')
const bycrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//Load USer Model

const User=require('../../models/User');

//@route GET    api/users/test
//@desc Tests users request
//@access public

router.get('/test',(req,res)=>{
    res.json({msg:"Users works"})
});

//@route POSt    api/users/register
//@desc Tests users request
//@access public

//registered user

// "_id": "5b5b3b208e02271170be2169",
//     "name": "pulkit",
//     "email": "rajpalpulki21@gmail.com",
//     "avatar": "//www.gravatar.com/avatar/e4d565bfa0e4f5f5f8cc0458f816008d?s=200&r=pg&d=mm",
//     "password": "$2a$10$zvVPyRu4tZ6o3NyXwnNXuuAELa.h/.Jy5wKYa2jbCiwDvzdhl1gG2",
//     "date": "2018-07-27T15:32:48.270Z",
//     "__v": 0

router.post('/register',(req,res)=>{
User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json({email:'Email already eists'})
        }
        else {
            const avatar=gravatar.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'mm'

            });

            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password

            });

            bycrypt.genSalt(10,(err,salt)=>{
                bycrypt.hash(newUser.password,salt,(error,hash)=>{
                    if(err) throw err;
                    newUser.password=hash;
                    newUser.save()
                        .then(user=>res.json(user))
                        .catch(err=>console.log(err))
                })
            })

        }
    })
})

//@route POSt    api/users/login
//@desc Login USer using JWt
//@access public

router.post('/login',(req,res)=>{

    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.status(404).json({email:"User not found"});
            }
            //Check password

         bycrypt.compare(password,user.password)
             .then(isMatch=>{
                 if(isMatch){
                     //user matched
                     res.json({msg: 'Success'});

                     //Sign token
                     jwt.sign();
                 }
                 else{
                    return res.status(400).json({msg:"User not found"})
                 }
             })

        })

})


module.exports=router;