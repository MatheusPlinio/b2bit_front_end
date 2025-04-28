import { getBoardBySlug } from "@/lib/api/boards";
import { useQuery } from "@tanstack/react-query";

export const useBoard = (slug: string) =>
    useQuery({
        queryKey: ["board", slug],
        queryFn: () => getBoardBySlug(slug),
        enabled: !!slug,
        retry: false
    });