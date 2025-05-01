'use client';

import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { toast } from 'sonner';

type DeletePostButtonProps = {
    postId: number;
};

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
    const queryClient = useQueryClient();

    const deletePostMutation = useMutation({
        mutationFn: async () => {
            await api.delete(`/api/post/${postId}/delete/`);
        },
        onSuccess: () => {
            toast.success('Post deletado com sucesso.');
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: () => {
            toast.error('Erro ao deletar post.');
        },
    });

    return (
        <button
            onClick={() => deletePostMutation.mutate()}
            className="text-muted-foreground hover:text-red-600 transition-all"
            title="Deletar post"
        >
            <Trash2 size={16} />
        </button>
    );
}
