import express from "express";

import {getAllUsers,getUser,deleteUser,updateUser} from '../controllers/user.controller.js';
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.route('/getUsers').get(isLoggedIn,getAllUsers);
router.route('/getUser/:id').get(isLoggedIn,getUser);
router.route('/deleteUser/:id').delete(isLoggedIn,deleteUser);
router.route('/updateUser/:id').patch(isLoggedIn,updateUser);

export default router;