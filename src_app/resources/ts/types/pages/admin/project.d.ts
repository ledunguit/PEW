import { Dayjs } from "dayjs";

export type CreateProjectForm = {
    name: string;
    description: string;
    company_name: string;
    number_of_employees: number;
    start_date: Dayjs;
    end_date: Dayjs;
};

export type AssignUserForm = {
    users: number[];
};

export type Project = {
    id: number;
    name: string;
    description: string;
    project_id: string;
    company_name: string;
    number_of_employees: number;
    start_date: string;
    end_date: string;
};
