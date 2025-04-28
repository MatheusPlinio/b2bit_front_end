import axios, { AxiosError } from 'axios';
import api from './axios';


export interface ApiResponse<T> {
    status: number;
    message: string;
    data?: T;
}

function extractErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const errData = error.response?.data as { message?: string };
        return errData?.message ?? error.message;
    }
    if (error instanceof Error) return error.message;
    return "Unexpected error occurred";
}

export async function postRequest<TRequest, TResponse>(
    url: string,
    payload: TRequest
): Promise<ApiResponse<TResponse>> {
    try {
        const response = await api.post<TResponse>(url, payload);

        return {
            status: response.status,
            message: "Success",
            data: response.data,
        };
    } catch (error: unknown) {
        return {
            status: (error as AxiosError).response?.status ?? 500,
            message: extractErrorMessage(error),
        };
    }
}
