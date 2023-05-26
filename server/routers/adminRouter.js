import express from "express"
import { adminLogin, adminLogout, checkAdminLoggedIn, createUser, deleteUser, editUser, getUser, getUsersList } from "../controllers/adminControllers.js"
import verifyAdmin from "../middleware/verifyAdmin.js"


const router= express.Router()

router.post("/login", adminLogin)
router.get("/users",verifyAdmin,getUsersList)
router.get("/users/:id",verifyAdmin,getUser)
router.post("/createUser",verifyAdmin, createUser)
router.post("/editUser",verifyAdmin, editUser)
router.post("/deleteUser",verifyAdmin, deleteUser)
router.get("/checkAuth", checkAdminLoggedIn)
router.get("/logout", adminLogout)
 
export default router