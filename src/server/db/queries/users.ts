import { Query } from "../connection";
import type { NewUser, User } from "../../types";

const register = ({ name, email, password, image_url }: NewUser) =>
    Query("INSERT INTO users (name, email, password, image_url) VALUES ($1, $2, $3, $4) RETURNING id", [name, email, password, image_url]);

const find = (email: User["email"]) => Query<User[]>("SELECT * FROM users WHERE email=$1", [email]);

const verify = (id: User["id"]) => Query("UPDATE users SET is_verified=1 WHERE id=$1", [id]);

export default {
    register,
    find,
    verify,
};
