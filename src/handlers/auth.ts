import { HttpStatusCode } from 'axios';
import { Handler } from 'sn-types-backend';
import { IUser } from '@src/types/user';
import { comparePassword } from '@utils/password';
import { CONFIG } from '@src/config';
import { UserRepository } from '@repository/user';

const { BASE_URL, DB_NAME } = CONFIG;

export const login: Handler<IUser> = async (req, res) => {
    const { username, password, email } = req.body;
    const { findUserRepo } = new UserRepository({
        baseUrl: BASE_URL,
        dbName: DB_NAME,
    });
    const found = await findUserRepo({ username, email });

    if (!found.status) {
        return res.status(found.statusCode).json({ message: found.message });
    }

    const checkPassword = await comparePassword(password, found.payload.password);

    if (!checkPassword) {
        return res.status(HttpStatusCode.Unauthorized).json({ message: 'incorrect password' });
    }

    return res.status(HttpStatusCode.Ok).send('logged in');
};

export const resetPassword: Handler<{ email: string }> = async (req, res) => {
    const { email } = req.body;

    return res.status(HttpStatusCode.Ok).send(email);
};

export const signup: Handler<IUser> = async (req, res) => {
    const { username, password, email } = req.body;

    console.log('username', username, 'password', password, 'email', email);
    const { createUserRepo } = new UserRepository({
        baseUrl: 'mongodb://localhost:27017',
        dbName: 'localUsers',
    });
    const result = await createUserRepo({ username, password, email });

    const response = result.status ? 'user created' : result.message;

    return res.status(result.statusCode).send(response);
};
