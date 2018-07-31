const express=require('express');
const router =express.Router();
const mongoose=require('mongoose')
const passport=require('passport');

// profile nd user modelss

const Profile=require('../../models/Profile')
const User=require('../../models/User')

//@route GET    api/profile/test
//@desc Tests users request
//@access public
router.get('/test',(req,res)=>{
    res.json({msg:"Posts works"})
});


//@route GET    api/profile
//@desc user profile
//@access Private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors={}
    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(!profile){
                errors.noprofile='There is no profile for the user'
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err=>{res.status(404).json(err)})
})

module.exports=router;