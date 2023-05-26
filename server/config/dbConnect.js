import mongoose from 'mongoose'
mongoose.set('strictQuery', false);

function dbConnect(){
    mongoose.connect("mongodb://127.0.0.1/Crud_react").then(result=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("data base error \n"+err)
    })
}
export default dbConnect