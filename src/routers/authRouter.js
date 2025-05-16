import express from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { signUpSchema, signInSchema } from '../schemas/authSchema.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), signIn);

export { authRouter };
