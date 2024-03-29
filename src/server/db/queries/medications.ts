import { Query } from "../connection";
import type { NewMedication } from "../../types";

const create = ({ name, pet_id, dosage_amount, dosage_unit, start_date, end_date, notes }: NewMedication) =>
    Query("INSERT INTO medications (name, pet_id, dosage_amount, dosage_unit, start_date, end_date, notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id", [
        name,
        pet_id,
        dosage_amount,
        dosage_unit,
        start_date,
        end_date,
        notes,
    ]);

export default {
    create,
};
