import jwt from 'jsonwebtoken'
export default async function verifyAdmin(req,res, next){
    try {
        const token =req.cookies.adminToken
        if(!token){
          return  res.json({loggedIn :false, message:"no token"})
        }
        const verifiedJWT= jwt.verify(token, "myjwtsecretkey")
        next()
    } catch (error) {
        console.log(error)
        res.json({loggedIn: false, error})
    }
}