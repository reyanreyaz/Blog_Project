import express from "express";
const router = express.Router();
import registration from "../controllers/registration.js";

router.post("/", registration.handleNewUser);

export default router;
