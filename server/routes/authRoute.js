import express from "express";
import { signup } from "../controllers/authController.js";
import { signin } from "../controllers/authController.js";
import { google } from '../controllers/authController.js';
const router = express.Router();

router.post( '/signup' , signup ); //it is going to be post request as we are creating it
router.post('/signin' , signin);
router.post('/google', google);

export default router;