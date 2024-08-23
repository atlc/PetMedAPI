import { Query } from "../connection";
import type { NewMedication } from "../../types";

const create = (
    { name, pet_id, dosage_amount, dosage_unit, start_date, end_date, schedule_quantity, schedule_unit, initial_administration_time, notes }: NewMedication,
    household_id: string
) =>
    Query(
        `
  WITH pet_household AS (SELECT household_id FROM pets WHERE id=$2),
  matched_households AS (SELECT 1 FROM households WHERE id=(SELECT household_id FROM pet_household) AND id=$11)
  INSERT INTO medications (name, pet_id, dosage_amount, dosage_unit, start_date, end_date, schedule_quantity, schedule_unit, initial_administration_time, notes)
    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 WHERE EXISTS (SELECT 1 FROM matched_households)
    RETURNING id
  `,
        [name, pet_id, dosage_amount, dosage_unit, start_date, end_date, schedule_quantity, schedule_unit, initial_administration_time, notes, household_id]
    );

export default {
    create,
};
