import express from 'express';
import { addUser } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', addUser)