import {ResponseSuccessType} from "@/types";
import axiosService from "../http";
import {ROUTES} from "@/route";

const projectService = {
    deleteDocument: async (projectId: string, documentId: number) => {
        return await axiosService.delete<ResponseSuccessType>(
            ROUTES.USER.PROJECTS.DELETE_DOCUMENT(projectId, documentId)
        );
    },
    verifyDocument: async (projectId: string, documentId: number) => {
        return await axiosService.post<ResponseSuccessType>(
            ROUTES.USER.PROJECTS.VERIFY_DOCUMENT,
            {
                project_id: projectId,
                document_id: documentId,
            }
        );
    },
    copyPublicKey: async (userId: number) => {
        return await axiosService.post<ResponseSuccessType>(
            ROUTES.USER.PROJECTS.COPY_PUBLIC_KEY,
            {
                user_id: userId,
            }
        );
    },
};

export default projectService;
