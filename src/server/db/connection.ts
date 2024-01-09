import pg from "pg";
import config from "../config";

const pool = new pg.Pool(config.db);

type QueryResultsReturningID = pg.QueryResult & { insertId?: string };

export const Query = async <T = QueryResultsReturningID>(sql: string, vals?: unknown[]) => {
    const res = await pool.query(sql, vals);

    if (res.command === "SELECT") return res.rows as T;
    if (res.command === "INSERT") return { ...res, insertId: res.rows[0].id } as T;

    return res as T;
};
