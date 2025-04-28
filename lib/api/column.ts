import { ICreateColumnRequest } from "@/types/column";
import api from "../axios";

export const getTasksByColumn = async (columnId: number) => {
    const response = await api.get(`/api/boards/columns/tasks/${columnId}`);
    return response.data;
};

export const createColumn = async (data: ICreateColumnRequest, slug: string) => {
    const response = await api.post('/api/boards/columns/store', data, {
        params: { board_slug: slug }
    });
    return response.data;
};