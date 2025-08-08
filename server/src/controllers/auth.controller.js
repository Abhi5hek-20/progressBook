import User from "../models/userdb.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config(); // Load environment variables

// signUp
export const signUp = async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Invalid data..",
        });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "email or username already exists..!",
      });
    }

    const userId = uuidv4(); // generate userId unique and random

    // Create new user (password will be hashed automatically by the pre-save middleware)
    const newUser = new User({
      _id: userId,
      username,
      email,
      password
    });

    await newUser.save();

    // generate token
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {expiresIn: "1h",});

    return res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 3600000, // 1 hour
            })
            .json({
                success: true,
                userProfile: {
                _id: userId,
                username,
                email,
                },
                message: "Account created successfully..!",
            });

  } catch (error) {
    console.log("error in auth.controller- signUp: ", error);

    // Check for MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "email or username already exists..!",
      });
    }
    
    return res.status(500).json({
       success: false, 
       message: "Internal Server Error"
       });
  }
};

// logIn
export const logIn = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    if(!username || !password){
        return res.status(400).json({message:"All fields are required.!",success:false});
    }

    // Find user by username
    const userProfile = await User.findOne({ username });

    if (!userProfile) {
        return res.status(400).json({
            success: false,
            message: "Username does not exists.!"
        });
    }

    // Check password using the method defined in the User model
    const checkPassword = await userProfile.comparePassword(password);

    if (!checkPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials.!"
        });
    }

    // Generate token
    const token = jwt.sign({ _id: userProfile._id }, process.env.JWT_SECRET, {expiresIn: "1h",});
    
    return res.status(200)
            .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 3600000, // 1 hour
            })
            .json({
                success: true,
                userProfile,
                message: "Logged in successfully",
            });

  } catch (error) {
    console.log("error in auth.controller-logIn: ", error);
    res.status(500).json({
        message: "Internal Server Error",
        success: false,
    });
  }
};

//logOut
export const logOut = (req, res) => {
 
    res.status(200).clearCookie("token", { 
        httpOnly: true, 
        secure: false,
        sameSite: "Lax"
    })
    .json({
        success:true,
        message:"Logged Out successfully.!",
    });
};



export const checkAuth = async (req,res) => {
    const {_id: userId} = req.user; 
    
    try {
        const userProfile = await User.findById(userId);
        
        if (!userProfile) {
            return res.status(400).json({
                message: "User not found.!",
                success: false,
            });
        }

        return res.status(200).json({
             userProfile,
             success: true,
             message: "checkAuth Done..!",
        });

    } catch(error) {
        console.log("Error in checkAuth :", error);
        res.status(400).json({
            message: "session Expired.!",
            success: false,
        });
    }  
}