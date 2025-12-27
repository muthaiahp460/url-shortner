import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectToLongUrl } from "./controllers/url.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

// redirect route
app.get("/:shortCode", redirectToLongUrl);

export default app;
