const TOKEN_KEY = "token";

const tokens = {
    get: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
    set: (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
    },
};

export default {
    tokens,
};
