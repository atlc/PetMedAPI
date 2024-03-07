import dotenv from "dotenv";
dotenv.config();

const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
};

const jwt = {
    secret: process.env.JWT_SECRET as string,
    expiration: process.env.JWT_EXPIRATION,
};

interface ConfigObject {
    [key: string]: string | undefined;
}

const hasUndefinedValues = (configObject: ConfigObject) => {
    return Object.values(configObject).some((val) => typeof val === "undefined");
};

if (hasUndefinedValues(jwt)) {
    console.log("\n\nMissing JWT config vars!\n\n");
    process.exit(1);
}

export default {
    db,
    jwt,
};
