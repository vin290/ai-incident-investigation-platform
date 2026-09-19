import User from "../models/User.js";
import  generateToken  from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const{ name, email, password } = req.body;

        if (!name||!email||!password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {

            return res.status(400).json({ success: false, message: "User already exists" });
        }   
        

        const user = new User({name ,email,password});

    await user.save();
        return res.status(201).json({ success: true, message: "User registered successfully",  user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }});   
      
    } catch (error) {   
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {

    try{
          const {email,password} = req.body;

          if(!email||!password){
            return res.status(400).json({success:false,message:"Please provide email and password"});
          }
          const user = await User.findOne({email});

          if(!user){
            return res.status(401).json({success:false,message:"Invalid email or password"});
          }

          const ispasswordCorrect = await user.comparePassword(password);

          if(!ispasswordCorrect){
            return res.status(401).json({success:false,message:"Invalid email or password"});
          }

          const token = generateToken(user);
          return res.status(200).json({success:true,message:"Login successful",token, user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },});
    }
    catch(error){
        console.error("Error logging in user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const protect = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
         console.log("Authorization Header:", authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({success:false,message:"Not authorized, no token"});
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }
    catch(error){
        console.error("Error in protect middleware:", error);
        return res.status(401).json({success:false,message:"Not authorized, token failed"});
    }
}

