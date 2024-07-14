export const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    INFO: "/info",
    USER: {
        DASHBOARD: "/dashboard",
        DOCUMENTS: "/documents",
        PROJECTS: "/projects",
        SETTINGS: {
            INDEX: "/settings",
            CREATE_KEY_PAIR: "/settings/create-key-pair",
        },
        PROFILE: "/profile",
    },
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        PROJECTS: "/admin/projects",
        USERS: {
            INDEX: "/admin/users",
            CREATE: "/admin/users/create",
            EDIT: "/admin/users/edit",
            DELETE: "/admin/users/delete",
            UPDATE: "/admin/users/update",
            UPDATE_PASSWORD: "/admin/users/update-password",
            UPDATE_ROLE: "/admin/users/update-role",
            UPDATE_STATUS: "/admin/users/update-status",
        },
        SETTINGS: {
            INDEX: "/admin/settings",
        },
        PROFILE: "/admin/profile",
    },

    SETTINGS: {
        CREATE_KEY_PAIR: "/settings/create-key-pair",
        GET_KEY_PAIR: "/settings/get-key-pair",
    },
};
