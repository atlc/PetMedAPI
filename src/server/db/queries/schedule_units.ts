import { Query } from "../connection";
import type { ScheduleUnit } from "../../types";

const all = () => Query<ScheduleUnit[]>("SELECT * FROM schedule_units");

export default {
    all,
};
