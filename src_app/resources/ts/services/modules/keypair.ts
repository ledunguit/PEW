import { ROUTES } from "@/route";
import axiosService from "../http";
import { ResponseSuccessType } from "@/types";

export const keypairService = {
    create: (payload: { algorithm: string }) => {
        return axiosService.post<ResponseSuccessType>(
            ROUTES.SETTINGS.CREATE_KEY_PAIR,
            payload
        );
    },
    getKeyPair: (payload: { password: string }) => {
        return axiosService.post<ResponseSuccessType>(
            ROUTES.SETTINGS.GET_KEY_PAIR,
            payload
        );
    },
};
