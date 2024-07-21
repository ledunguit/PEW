import {ROUTES} from "@/route";
import axiosService from "@/services/http";
import {ResponseSuccessType} from "@/types";

export const userManagementService = {
    getUsersLikeByName: (email: string) => {
        return axiosService.post<ResponseSuccessType>(
            ROUTES.ADMIN.USERS.GET_USERS_LIKE_BY_NAME,
            {
                email,
            }
        );
    },
    generateKeyPair: (user_id: number) => {
        return axiosService.post<ResponseSuccessType>(
            ROUTES.ADMIN.USERS.GENERATE_KEY_PAIR,
            {
                user_id,
            }
        );
    }
};
