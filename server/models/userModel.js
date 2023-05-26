import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type :String,
        required:true
    }
    ,
    about:{
        type:String,
        required:false
    },
    proffession :{
        type: String,
        requied: true
    },
    password: {
        type :String,
        required:true
    },
    profile:{
        type :String,
        default:"avatar.jpg"
    }
})

const UserModel = mongoose.model("User", UserSchema)
export default UserModel