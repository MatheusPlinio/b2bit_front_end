import { fetchBoards } from "@/lib/api/boards";
import { Board } from "@/types/board";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: fetchBoards,
    retry: false,
});