import express from 'express'
import multer from 'multer'
import { checkUserLoggedIn, editProfile, userLogin, userLogout, userRegister } from '../controllers/userController.js'


const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function (req,file, cb ){
        const uniqueSuffix = Date.now ()+ ".jpg"
        cb(null,file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({storage: storage})

router.get('/', (req,res)=>{res.json('hello')})
router.post('/register',userRegister)
router.post("/login", userLogin)
router.get("/logout", userLogout)
router.get("/checkAuth", checkUserLoggedIn)
router.post('/editProfile',upload.single('file'),editProfile)


export default router