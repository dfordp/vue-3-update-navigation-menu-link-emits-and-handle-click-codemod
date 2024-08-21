import express from "express";
import { registration, login }  from "../controllers/userAuth.controller.js";


const router = express.Router();


router.route('/register').post(registration);
router.route('/login').post(login);

export default router;