const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const emailCheck = require("../lib/emailCheck");
const User = require("../models/user.model");

const router = require("express").Router();

router.post("/register", async (req, res) => {
    try {
        let {email, password, passwordCheck, displayName} = req.body;

        if(!email || !password || !passwordCheck) {
            return res.status(400).json({msg: "All required field have to been filled."})
        };
        
        if(!emailCheck(email)) {
            return res.status(400).json({mgs: "The entered email is not valid."})
        };
        
        if(password !== passwordCheck) {
            return res.status(400).json({msg: "The entered passwords are not equal."})
        };

        const existingUser = await User.findOne({email: email})

        if (existingUser) {
            return res.status(400).json({msg: "User already exists."})
        };

        if(!displayName) { displayName = email};

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        const savedUser = await newUser.save();
        res.json({msg: `Welcome ${savedUser.displayName}}`});
        
    } catch(err) {
        res.status(500).json({error: err.message});
    };
    
});

router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({msg: "All required field have to been filled."})
        };
         
        const user = await User.findOne({email: email})

        if (!user) {
            return res.status(400).json({msg: "Account with this email doesn't exists"})
        };

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        
        res.json({token, user: {id: user._id, email: user.email, displayName: user.displayName}})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;