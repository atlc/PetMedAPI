import { Query } from "../connection";
import { UserHousehold } from "../../types";

const create = ({ user_id, household_id }: UserHousehold) =>
    Query("INSERT INTO user_households (user_id, household_id) VALUES ($1, $2)", [user_id, household_id]);

export default {
    create,
};
