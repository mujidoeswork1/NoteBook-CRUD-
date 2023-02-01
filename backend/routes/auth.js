const express = require("express");
const router = express.Router();
const User= require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const fetchuser= require('../middleWare/fetchuser');
const { response } = require("express");
const JWT_SECRET ='Harryisagoodb$oy';

// ROUTE 1) CREATE A User using: POST "/api/auth/createuser", donot require auth
router.post('/createuser',[
    body('name','enter valid name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
], async (req, res)=>{
  // if errors, return bad request and the errors...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check wether the user with this email exists already
    try {
      
    
   let user = await User.findOne({email:req.body.email});
   if(user){
    res.status(400).json({error: 'sorry email exists already'})
   } 
   const salt= await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password,salt) ;

   user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
      // .then(user => res.json(user)).catch(e=> {console.log(e) 
      // res.json({error:'please enter a unique value'})
      const data={
        user:{
          id:user.id,

        }
      }
      const authtoken= jwt.sign(data, JWT_SECRET)
      // console.log(authtoken);
      res.json({authtoken}); 
    } catch (error) { 
      console.error(error.message); 
      res.status(400).json("Some error occured");
    }
})
    // res.send(req.body) 
    

//ROUTE 2) Authenticate a user using POST "/api/auth/login", No login required

router.post('/login',[
  body('email').isEmail(),
  body('password','password canot be blank').exists()
], async (req, res)=>{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  
  const {email, password}=req.body;

  try {
    let user=await User.findOne({email});
    if(!user){
      res.status(400).json({error:"Sorry, user does not exist"});
    }

   const passwordCompare= await bcrypt.compare(password, user.password);
   if(!passwordCompare){
    success=false;
    return res.status(400).json({success, error:'please try to login with correct credentials'});
   }
   const data={
    user:{
      id:user.id,

    }
  }
  const authtoken= jwt.sign(data, JWT_SECRET)
  success=true;
  res.json({success,authtoken});

  } catch (error) { 
    console.error(error.message); 
    res.status(400).json("Internal server error occured");
  }

})


//ROUTE 3) Get logged in user details, using POST "/api/auth/getuser",  login required
router.post('/getuser',fetchuser, async (req, res)=>{
try {
  let userId= req.user.id;
  const user= await User.findById(userId).select('-password'); 
  res.send(user);
} catch (error) { 
  console.error(error.message); 
  res.status(400).json("Internal server error occured");
}
})
 

module.exports=router;