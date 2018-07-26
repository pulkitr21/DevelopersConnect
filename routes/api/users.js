const express=require('express');
const router =express.Router();
const gravatar=require('gravatar')
const bycrypt=require('bcryptjs')
//Load USer Model

const User=require('../../models/User');

//@route GET    api/users/test
//@desc Tests users request
//@access public

router.get('/test',(req,res)=>{
    res.json({msg:"Users works"})
});

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

module.exports=router;