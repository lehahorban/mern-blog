import { Router } from "express";
import { register, login, current } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Registration
// http://localhost:3002/api/auth/register

router.post("/register", register)

// Login
// http://localhost:3002/api/auth/login

router.post("/login", login)

// Current
// http://localhost:3002/api/auth/current

router.get("/current", checkAuth, current)

export default router;