import User from '../models/user.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import Token from '../models/token.js';
import jwt from 'jsonwebtoken';
dotenv.config();
export const userSignup=async(req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const user={name:req.body.name,email:req.body.email,password:hashedPassword};

        const newUser=new User(user);
        await newUser.save();
        return res.status(200).json({message:'Registration Succesful',success:true});
    }
    catch(err)
    {
        console.log(err.message)
        return res.status(500).json({message:'Registration Failed',success:false});
    }
}
export const userSignin=async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email})
        if(!user)
        {
            return res.status(400).json({msg:'user not found',success:false});
        }
        try{
            let match=await bcrypt.compare(req.body.password,user.password);
            if(match)
            {
                const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
                const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
                const newToken=new Token({token:refreshToken});
                await newToken.save();
                return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken, msg:'Logged in succesfully',success:true,user:user});
            }
            else{
                return res.status(400).json({msg:'user not found',success:false});

            }

        }
        catch(err)
        {
            console.log(err.message)
            return res.status(500).json({message:'Logged in Failed',success:false});
        }
    }
    catch(err)
    {
        console.log(err.message)
        return res.status(500).json({message:'Logged in Failed',success:false});
    }
}
