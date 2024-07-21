export type SharedData = {
    route: string;
    auth: AuthData;
    csrf_token: string
};

export type AuthData = {
    user: {
        id: number;
        email: string;
        name: string;
        role: "admin" | "user";
    };
};
