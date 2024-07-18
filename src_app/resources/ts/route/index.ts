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
        PROJECTS: {
            INDEX: "/admin/projects",
            CREATE: "/admin/projects/create",
            EDIT: "/admin/projects/edit",
            DELETE: (id: number) => `/admin/projects/delete/${id}`,
            UPDATE: "/admin/projects/update",
            ASSIGN_USERS: "/admin/projects/assign-users",
        },
        DOCUMENTS: {
            INDEX: "/admin/documents",
            CREATE: "/admin/documents/create",
            EDIT: "/admin/documents/edit",
            DELETE: (id: number) => `/admin/documents/delete/${id}`,
            UPDATE: "/admin/documents/update",
        },
        USERS: {
            INDEX: "/admin/users",
            CREATE: "/admin/users/create",
            EDIT: "/admin/users/edit",
            DELETE: "/admin/users/delete",
            UPDATE: "/admin/users/update",
            UPDATE_PASSWORD: "/admin/users/update-password",
            UPDATE_ROLE: "/admin/users/update-role",
            UPDATE_STATUS: "/admin/users/update-status",
            GET_USERS_LIKE_BY_NAME: `/admin/users/get-users-like-by-name`,
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
