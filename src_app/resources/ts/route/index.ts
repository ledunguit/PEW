export const ROUTES = {
    DASHBOARD: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    INFO: "/info",
    USER: {
        DOCUMENTS: "/documents",
        PROJECTS: "/projects",
        SETTINGS: {
            INDEX: "/settings",
            CREATE_KEY_PAIR: "/settings/create-key-pair",
        },
        ACCOUNT: "/account",
    },
    ADMIN: {
        DOCUMENTS: "/admin/documents",
        PROJECTS: "/admin/projects",
        SETTINGS: {
            INDEX: "/admin/settings",
        },
        ACCOUNT: "/admin/account",
    },

    SETTINGS: {
        CREATE_KEY_PAIR: "/settings/create-key-pair",
        GET_KEY_PAIR: "/settings/get-key-pair",
    },
};
