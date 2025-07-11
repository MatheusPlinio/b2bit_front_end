import api from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useHoverUserInfo = (userId: number | null) => {
    return useQuery({
        queryKey: ["user-hover-info", userId],
        queryFn: async () => {
            const res = await api.get(`/api/user/${userId}/info/`)
            return res.data
        },
        enabled: !!userId,
    })
}

export const useFollowToggle = (userId: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            await api.post(`/api/follow/${userId}/`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-hover-info", userId],
            })
        },
    })
}