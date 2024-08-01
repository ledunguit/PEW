import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
    timeout: 1000 * 30,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response.data;
    },
    async (error: AxiosError): Promise<AxiosError> => {
        const { response } = error;
        if (response) {
            return Promise.reject(response.data);
        }
        return Promise.reject(error);
    }
);

const axiosService = {
    get<T>(url: string): Promise<T> {
        return axiosInstance.get(url);
    },
    post<T>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig<object>
    ): Promise<T> {
        return axiosInstance.post(url, data, config);
    },
    put<T>(url: string, data?: object): Promise<T> {
        return axiosInstance.put(url, data);
    },
    patch<T>(url: string, data?: object): Promise<T> {
        return axiosInstance.patch(url, data);
    },
    delete<T>(url: string, data?: object): Promise<T> {
        return axiosInstance.delete(url, data);
    },
};

export default axiosService;
