import express from 'express';
const router = express.Router();
import { login } from '../controllers/auth.controller.js';

// El login siempre va por post, nunca por get.

router.post('/login', login);

export default router;
