import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import AdminModel from "../models/adminModel.js";


let salt = bcrypt.genSaltSync(10);

export async  function adminLogin(req,res){
    try {
        const {email,password} = req.body;    
        console.log(req.body);
        const admin=await AdminModel.findOne({email})
    
        if(!admin){
            return res.json({error: true, message: "You have no admin access"})
        }
       
        if (password !== admin.password) {
          return res.json({ error: true, message: 'Wrong password' });
        }
        const token = jwt.sign({
            id: admin._id
        },"myjwtsecretkey"
        ) 
        return res.cookie("adminToken",token ,{
            httpOnly: true,
            maxAge: 1000*60*60*24*7,
            secure: true,
            sameSite: "none"
            
        }).json({error: false})
    } catch (error) {
        res.json({error: error, message: "Server error"})
        console.log(error)
    }
}

export async function adminLogout(req,res){
    res.cookie("adminToken", "", {
        secure: true,
        expires: new Date(0),
        httpOnly: true,
        sameSite: "none"
    }).json({message: "Logged Out Successfully...", error: false})
}


export async function getUsersList(req,res){
    
    let users= await UserModel.find({name: new RegExp(req.query.search, 'i')},{password:0}).lean();
    
    res.json(users)
}

export async function getUser(req,res){
    let user= await UserModel.findById(req.params.id)
    
    res.json({user})
}

export async function createUser(req,res){
    try {
        const {name,email,password,about,proffession}= req.body;
        const hashPassword= bcrypt.hashSync(password, salt)
        const user = await UserModel.findOne({email});
        if(user){
            res.json({error : true, message:"User already exists"})
        }
        const newUser= new UserModel({name,email,password:hashPassword,about,proffession})
        await newUser.save();
        console.log(newUser)
        return res.json({error:false})
    } catch (error) {
        res.json({error:error})
        console.log(error);
    }  
  

}

export async function editUser(req,res){
    try {
        
        const {name,email,about,proffession,id}= req.body;
          console.log(id)
       await UserModel.findByIdAndUpdate(id,
        {
            $set:{
                name,email,about, proffession
            }
        })
        return res.json({error: false})
    } catch (error) {
        res.json({error: error, message:"Something went wrong"})
        console.log(error)
   
    }
}       
  
export async function deleteUser(req,res){   
    try {    
        const {id}= req.body; 
        await UserModel.findOneAndDelete(id)
        return res.json({error:false})

    } catch (error) {
        res.json({error:true, message:"Something went wrong"})
        console.log(error);
    }
}

export async function checkAdminLoggedIn(req,res){
    try {
        const token =req.cookies.adminToken
        if(!token){
          return  res.json({loggedIn :false, message:"no token"})
        }
        const verifiedJWT= jwt.verify(token, "myjwtsecretkey")
        return res.json({name: verifiedJWT.name, loggedIn: true})
    } catch (error) {
        res.json({loggedIn: false, error})
    }
}
