import { Query } from "../connection";
import { NewPet, Pet } from "../../types";

const create = ({ name, species, birthdate, image_url, weight, household_id }: NewPet) =>
    Query("INSERT INTO pets (name, species, birthdate, image_url, weight, household_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", [
        name,
        species,
        birthdate,
        image_url,
        weight,
        household_id,
    ]);

export default {
    create,
};
