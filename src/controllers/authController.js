import db from '../db.js';
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    try {
        const newUser = res.locals.newUser;

        const passwordHash = bcrypt.hashSync(newUser.password, 10);
        delete newUser.password;

        await db.collection("users").insertOne({ ...newUser, password: passwordHash });

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    try {
        const user = res.locals.user;

        const token = uuid();

        await db.collection("sessions").insertOne({ token, userId: user._id });
        res.status(200).send({ name: user.name, token });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
