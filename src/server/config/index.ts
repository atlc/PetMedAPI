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

const mailgun = {
    domain: process.env.MG_DOMAIN as string,
    api_key: process.env.MG_API_KEY as string,
};

const domain = {
    url: process.env.CLIENT_URL_BASE,
};

interface ConfigObject {
    [key: string]: string | undefined;
}

const hasUndefinedValues = (configObject: ConfigObject) => {
    return Object.values(configObject).some((val) => typeof val === "undefined");
};

const all_envars = {
    db,
    domain,
    jwt,
    mailgun,
};

for (const key in all_envars) {
    const obj = all_envars[key as keyof typeof all_envars];
    if (hasUndefinedValues(obj)) {
        console.log("\n\nMissing required config vars!\n\n");
        process.exit(1);
    }
}

export default all_envars;
