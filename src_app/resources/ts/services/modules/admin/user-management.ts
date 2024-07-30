import { ROUTES } from "@/route";
import axiosService from "@/services/http";
import { CreateUserForm, ResponseSuccessType } from "@/types";

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
    },
    createUser: (payload: CreateUserForm) => {
        console.log(payload);

        return axiosService.post<ResponseSuccessType>(
            ROUTES.ADMIN.USERS.CREATE,
            payload
        );
    },
    deleteUser: (id: number) => {
        return axiosService.delete<ResponseSuccessType>(
            ROUTES.ADMIN.USERS.DELETE(id)
        );
    },
    updateUserStatus: (id: number, status: boolean) => {
        return axiosService.post<ResponseSuccessType>(
            ROUTES.ADMIN.USERS.UPDATE_STATUS(id),
            {
                status,
            }
        );
    },
};
