import { QueryResult } from "pg";
import connectionDb from "../config/database.js";
import { User } from "@/protocols/user";

async function findByEmail(email:string): Promise<QueryResult<User>> {
    return await connectionDb.query(
        `    
    SELECT * FROM users WHERE email=$1
  `,
        [email]
    );
}

async function create(user:User): Promise<void> {
    const { name, email, password } = user
    await connectionDb.query(
        `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `,
        [name, email, password]
    );
}

async function findById(id:string):Promise<QueryResult<User>> {
    return await connectionDb.query(
        `    
    SELECT * FROM users WHERE id=$1
  `,
        [id]
    );
}

export default {
    findByEmail,
    create,
    findById,
};
