import { ROUTES } from "@/route";
import axiosService from "@/services/http";
import { CreateProjectForm, ResponseSuccessType } from "@/types";

export const projectService = {
    create: (values: CreateProjectForm) => {
        const {
            name,
            description,
            company_name,
            number_of_employees,
            start_date,
            end_date,
        } = values;

        const payload = {
            name,
            description,
            company_name,
            number_of_employees,
            start_date: start_date.format("YYYY-MM-DD"),
            end_date: end_date.format("YYYY-MM-DD"),
        };

        return axiosService.post<ResponseSuccessType>(
            ROUTES.ADMIN.PROJECTS.CREATE,
            payload
        );
    },
    delete: (id: number) => {
        return axiosService.delete<ResponseSuccessType>(
            ROUTES.ADMIN.PROJECTS.DELETE(id)
        );
    },
    assignUsers: (projectId: string, userIds: string[]) => {
        const payload = {
            project_id: projectId,
            user_ids: userIds,
        };

        return axiosService.post<ResponseSuccessType>(
            ROUTES.ADMIN.PROJECTS.ASSIGN_USERS,
            payload
        );
    },
};
