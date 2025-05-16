import loginUserSchema from '../schemas/loginUserSchema.js';
import db from '../db.js';
import bcrypt from 'bcrypt';

async function validateLoginUser(req, res, next) {
    const infoUser = req.body;

    const { error } = loginUserSchema.validate(infoUser);
    if (error) return res.sendStatus(422);

    for (const prop in infoUser) {
        infoUser[prop] = infoUser[prop].trim();
    }

    try {
        const user = await db.collection('users').findOne({ email: infoUser.email });

        if (user && bcrypt.compareSync(infoUser.password, user.password)) {
            res.locals.user = user;
            next();
        } else {
            res.status(401).send('Email e/ou senha inválido(s)!');
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default validateLoginUser;
