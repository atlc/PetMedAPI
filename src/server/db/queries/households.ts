import { Query } from "../connection";
import { NewHousehold } from "../../types";

const create = ({ name, owner_id }: NewHousehold) => Query("INSERT INTO households (name, owner_id) VALUES ($1, $2) RETURNING id", [name, owner_id]);

export default {
    create,
};
