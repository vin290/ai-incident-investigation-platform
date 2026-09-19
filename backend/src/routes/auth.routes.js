import express from "express";
import {  registerUser,loginUser,protect } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;