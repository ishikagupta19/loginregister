const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");



require('../db/conn');
const User = require("../model/userSchema");
const e = require('express');


router.post('/register', async (req,res)=> {

    const {name, dob, email, password } = req.body;

    if(!name || !dob || !email || !password ){
        return res.status(422).json({error: "Please fill all the fields properly"});
    }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist) {
            return res.status(422).json({error: "Email already exist"});
        }

        const user = new User({name, dob, email, password });

       const userRegister= await user.save();
        if(userRegister){
       return res.status(201).json({message: "user registered successfully"});
    }else {
        res.status(500).json({ error: "Failed to register"});
    }

    } catch (err) { 
            console.log(err);
    }

});

//login route

router.post('/signin', async (req, res) => {
    try{
        const {email,password} = req.body;

        if( !email || !password){
            return res.status(400).json({error:"Please fill the data"});
        }
 
            const userLogin = await User.findOne({ email: email });
      

            if(userLogin){

                const isMatch = await bcrypt.compare(password, userLogin.password);

                const token = await userLogin.generateAuthToken();
                console.log(token);
                
                res.cookie("jwttoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

            if( !isMatch){
                res.status(400).json({ error: "Invalid credentials!"});
            } else{
                res.json({ message: "User Sign in successfully"});
            }

            } else{
                res.status(400).json({ error: "Invalid credentials!"});
            }

            

    } catch(err) {
        console.log(err);
    }
});


router.get("/about", authenticate, (req,res) => {
    console.log(`Hello About`);
    res.send(req.rootUser);
});

// get user data frome contact us and home page

router.get("/getdata", authenticate, (req, res) => {
    console.log(`Hello from about side`);
    res.send(req.rootUser);
})


router.get("/logout", (req,res) => {
    console.log(`hello from logout!`);
    res.clearCookie('jwttoken', { path: '/'});
    res.status(200).send(message = "User Logout");
});


module.exports = router;