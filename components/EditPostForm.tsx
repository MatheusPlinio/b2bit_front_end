'use client';

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import api from "@/lib/axios";

type EditPostFormProps = {
    postId: number;
    initialContent: string;
    onCancel: () => void;
};

export default function EditPostForm({
    postId,
    initialContent,
    onCancel,
}: EditPostFormProps) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<{ content: string }>({
        defaultValues: { content: initialContent },
    });

    const mutation = useMutation({
        mutationFn: async ({ id, content }: { id: number; content: string }) => {
            const res = await api.put(`api/post/${id}/`, { content });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Post atualizado.");
            onCancel();
            reset();
        },
        onError: () => {
            toast.error("Erro ao atualizar post.");
        },
    });

    const onSubmit = (data: { content: string }) => {
        mutation.mutate({ id: postId, content: data.content });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            <textarea
                className="w-full text-sm p-2 border rounded bg-background"
                {...register("content", { required: true })}
                rows={3}
            />
            <div className="mt-2 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        onCancel();
                        reset();
                    }}
                >
                    Cancelar
                </Button>
                <Button size="sm" type="submit" disabled={mutation.isPending}>
                    <Check className="w-4 h-4 mr-1" />
                    Salvar
                </Button>
            </div>
        </form>
    );
}
