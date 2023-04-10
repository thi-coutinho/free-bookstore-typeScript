import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../protocols/user.js";

async function create(user: User):Promise<void> {
    const { name, email, password } = user
    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password }) {
    const {
        rowCount,
        rows: [user],
    } = await userRepositories.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, { expiresIn: 86400 }); 
    return token;
}

export default {
    create,
    signin,
};
