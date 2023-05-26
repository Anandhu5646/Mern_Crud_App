import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let salt = bcrypt.genSaltSync(10);
export async function userRegister(req,res){
    try {
        const {name,email,password,about,proffession} = req.body
        const hashPassword = bcrypt.hashSync(password, salt);
        const user= await UserModel.findOne({email});
        if(user){
            return res.json({error: true, message: " User Already Exist"})
        }

        const newUser= new UserModel({name,email,password:hashPassword ,about,proffession})
        await newUser.save();
        console.log(newUser)
        const token= jwt.sign({
            id: newUser._id
        },"myjwtsecretkey")
        return res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            maxAge:1000*60*60*24*7,
            samesite:"none"

        }).json({error:false})
    } catch (error) {
        res.json({error})
        console.log(error)
    }
} 

export async function userLogin(req,res){
        try {
            const {email,password}= req.body
            const user= await UserModel.findOne({email})
            if(!user){
                return res.json({error:true, message: "No User Found"})
            }
            const userValid = bcrypt.compareSync(password, user.password);
            if(!userValid){
                return res.json({error: true, message: "Wrong Password"})
            }
            
            const token = jwt.sign({
                id: user._id
            },"myjwtsecretkey"
            )
            console.log(token)
            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000* 60*60*24*7*30,
                samesite: "none"
            }).json({error: false, user:user._id})
        } catch (err) {
            res.json({message: "server error", error: err})
            console.log(err)
        }
}

export async function userLogout(req,res){
   
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        samesite: "none"
    }).json({message:"logged out", error: false})
}

export async function checkUserLoggedIn(req,res){
    try {
        const token= req.cookies.token
        console.log(token +'token');
        if(!token){

            return res.json({loggedIn:false, error: true , message:"No Token"})
        }
             const verifiedJWT= jwt.verify(token,"myjwtsecretkey")
             const user= await UserModel.findById(verifiedJWT.id ,{password:0})
        if(!user){
            return res.json({loggedIn: false})
        }
        return res.json({user, loggedIn : true})
    } catch (error) {
        console.log(error)
        res.json({error, loggedIn: false})
    }
}

export async function editProfile(req,res){
    try {
        await UserModel.findByIdAndUpdate(req.body.id,{
            $set:{
                profile:req.file.filename
            }
        })
        return res.json({error: false})
    } catch (error) {
       res.json({error: true,message:"Something went wrong"}) 
    }
}