export const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    INFO: "/info",
    USER: {
        DASHBOARD: "/dashboard",
        DOCUMENTS: "/documents",
        PROJECTS: {
            INDEX: "/projects",
            DETAIL: (projectId: string) => `/projects/detail/${projectId}`,
            UPLOAD_DOCUMENT: "/projects/upload-document",
            DOWNLOAD_DOCUMENT: (projectId: string, documentId: number) =>
                `/projects/download-document/${projectId}/${documentId}`,
        },
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
            DOWNLOAD_DOCUMENT: (projectId: string, documentId: number) =>
                `/admin/documents/download-document/${projectId}/${documentId}`,
        },
        USERS: {
            INDEX: "/admin/users",
            CREATE: "/admin/users/create",
            EDIT: "/admin/users/edit",
            DELETE: (id: number) => `/admin/users/delete/${id}`,
            UPDATE: "/admin/users/update",
            UPDATE_PASSWORD: "/admin/users/update-password",
            UPDATE_ROLE: "/admin/users/update-role",
            UPDATE_STATUS: (id: number) => `/admin/users/update-status/${id}`,
            GET_USERS_LIKE_BY_NAME: `/admin/users/get-users-like-by-name`,
            GENERATE_KEY_PAIR: "/admin/users/generate-key-pair",
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
