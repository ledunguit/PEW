export type SharedData = {
    route: string;
    auth: AuthData;
};

export type AuthData = {
    user: {
        id: number;
        email: string;
        name: string;
        role: "admin" | "user";
    };
};
