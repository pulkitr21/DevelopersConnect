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


//@route GET    api/profile
//@desc Create user profile
//@access Private

router.get('/',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        //Get Fields

        const profileFields={};
        profileFields.user=req.user.id;

        if(req.body.handle) profileFields.handle=req.body.handle;
        if(req.body.company) profileFields.company=req.body.company;
        if(req.body.website) profileFields.website=req.body.website;
        if(req.body.location) profileFields.location=req.body.location;
        if(req.body.bio) profileFields.bio=req.body.bio;
        if(req.body.githubusername) profileFields.githubusername=req.body.githubusername;
        if(req.body.status) profileFields.status=req.body.status;
        //split into array
        if(typeof req.body.skills!== 'undefined'){

            profileFields.skills=req.body.skills.split(',')
        }

        //Social

        profileFields.social={};
        if(req.body.youtube) profileFields.youtube=req.body.youtube;
        if(req.body.facebook) profileFields.facebook=req.body.facebook;
        if(req.body.twitter) profileFields.twitter=req.body.twitter;
        if(req.body.linkdin) profileFields.linkdin=req.body.linkdin;
        if(req.body.instagram) profileFields.instagram=req.body.instagram;

        Profile.findOne({user:req.user.id})
            .then(profile=>{
                if(profile){
                    //update
                    Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
                        .then(profile=>(res.json(profile)))

                }
                else{
                    //create the view
                    // check if it exists
                    Profile.findOne({handle:profileFields.handle}).then(profile=>{
                        if(profile){
                            errors.handle='This already exists'
                            res.status(400).json(errors);
                        }

                        //Save Profile
                        new Profile(profileFields).save().then(profile=>{res.json(profile)})



                    })
                }
            })



})

module.exports=router;