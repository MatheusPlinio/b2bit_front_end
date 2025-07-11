'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, HeartOff } from "lucide-react";
import api from "@/lib/axios";

interface LikeButtonProps {
    postId: number;
    likesCount: number;
    isLiked: boolean;
}

export function LikeButton({ postId, likesCount, isLiked }: LikeButtonProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await api.post(`/api/posts/${postId}/like/`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    console.log('isLiked:', isLiked);

    return (
        <button
            onClick={() => mutate()}
            disabled={isPending}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500"
        >
            {isLiked ? <Heart className="fill-red-500 text-red-500" size={16} /> : <HeartOff size={16} />}
            {likesCount}
        </button>
    );
}
