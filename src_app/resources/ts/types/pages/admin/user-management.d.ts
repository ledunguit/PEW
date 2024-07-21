import {Project} from "@/types";

export type User = {
    id: number
    name: string
    email: string
    role: "admin" | "user"
    created_at: string
    projects: Project[]
    vault_setting: any
}

export type UserManagementPageData = {
    users: User[]
}
