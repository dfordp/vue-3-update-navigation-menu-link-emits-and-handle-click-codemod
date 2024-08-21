import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import { getAllOrganizations, getOrganization, deleteOrganization, updateOrganization } from '../controllers/org.controller.js';

const router = express.Router();

router.route('/getOrgs').get(isLoggedIn, getAllOrganizations);
router.route('/getOrg/:id').get(isLoggedIn, getOrganization);
router.route('/deleteOrg/:id').delete(isLoggedIn, deleteOrganization);
router.route('/updateOrg/:id').patch(isLoggedIn, updateOrganization);

export default router;