import express from "express";
import {
  createShortUrl,
  getUserUrls,
} from "../controllers/url.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createShortUrl);
router.get("/", authMiddleware, getUserUrls);

export default router;
