import { Query } from "../connection";
import type { NewMedicationSchedule } from "../../types";

const create = ({ scheduled_time, medication_id }: NewMedicationSchedule) =>
    Query("INSERT INTO medication_schedules (scheduled_time, medication_id) VALUES ($1,$2) RETURNING id", [scheduled_time, medication_id]);

export default {
    create,
};
