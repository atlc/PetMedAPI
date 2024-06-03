import { Query } from "../connection";
import type { DosageUnit } from "../../types";

const all = () => Query<DosageUnit[]>("SELECT * FROM dosage_units");

export default {
    all,
};
