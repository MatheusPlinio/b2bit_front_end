import { CreateBoardRequest, CreateBoardResponse } from "@/types/board"
import api from "../axios"
import { AxiosResponse } from "axios"

export const fetchBoards = async () => {
    const response = await api.get('/api/boards')
    return response.data
}

export const createBoard = async (data: CreateBoardRequest) => {
    const response = await api.post<CreateBoardRequest, AxiosResponse<CreateBoardResponse>>('/api/boards/store', data)
    return response
};

export const getBoardBySlug = async (slug: string) => {
    const response = await api.get(`/api/boards/show/${slug}`);
    return response.data
}