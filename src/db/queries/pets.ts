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

const add_image = ({ id, image_url }: { id: Pet["id"]; image_url: Pet["image_url"] }) => Query("UPDATE pet SET image_url=$1 WHERE id=$2", [image_url, id]);

export default {
    add_image,
    create,
};
