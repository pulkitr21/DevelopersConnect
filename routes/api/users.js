const express=require('express');
const router =express.Router();
//Load USer Model

const User=require('../../models/User');

//@route GET    api/users/test
//@desc Tests users request
//@access public

router.get('/test',(req,res)=>{
    res.json({msg:"Users works"})
});

router.post('/resgister',(req,res)=>{
User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json({email:'Email already eists'})
        }
        else {
            const newUser=new User({
                name:req.body.name,
                email:req.body.password,

            })

        }
    })
})

module.exports=router;