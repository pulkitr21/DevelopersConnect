const express=require('express');

const router =express.Router();

//@route GET    api/profile/test
//@desc Tests users request
//@access public

router.get('/test',(req,res)=>{
    res.json({msg:"Posts works"})
})

module.exports=router;