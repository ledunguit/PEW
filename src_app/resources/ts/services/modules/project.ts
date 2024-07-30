import { ResponseSuccessType } from "@/types";
import axiosService from "../http";
import { ROUTES } from "@/route";

const projectService = {
    deleteDocument: async (projectId: string, documentId: number) => {
        return await axiosService.delete<ResponseSuccessType>(
            ROUTES.USER.PROJECTS.DELETE_DOCUMENT(projectId, documentId)
        );
    },
};

export default projectService;
