import { ROUTES } from "@/route";
import axiosService from "../http";
import { ResponseSuccessType } from "@/types";

const verifyDocumentService = {
    verifyDocument: (payload: FormData) => {
        return axiosService.post<ResponseSuccessType>(
            ROUTES.USER.DOCUMENTS.VERIFY,
            payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },
};

export default verifyDocumentService;
