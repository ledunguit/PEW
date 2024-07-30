import { Project } from "@/types";

export type User = {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    status: boolean;
    created_at: string;
    projects: Project[];
    vault_setting: any;
};

export type CreateUserForm = {
    name: string;
    email: string;
    password: string;
};

export type UserManagementPageData = {
    users: User[];
};
