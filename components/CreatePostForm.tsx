'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'
import { toast } from 'sonner'

const postSchema = z.object({
    content: z.string().min(1, 'Digite algo antes de postar.')
})

type PostFormData = z.infer<typeof postSchema>

export default function CreatePostForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<PostFormData>({
        resolver: zodResolver(postSchema)
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async (data: PostFormData) => {
            await api.post('api/posts/create/', data)
        },
        onSuccess: () => {
            toast.success('Post enviado!')
            reset()
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError: () => toast.error('Erro ao postar.')
    })

    const onSubmit = (data: PostFormData) => {
        mutate(data)
    }

    return (
        <div className="bg-[#f4f5f7] rounded-2xl shadow-sm border border-[#e0e0e0] mt-4 px-5 py-4 mb-6">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
                    👤
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
                    <Textarea
                        {...register('content', { required: 'Digite algo para postar' })}
                        placeholder="O que está acontecendo?"
                        className="resize-none text-base border-0 focus-visible:border-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 text-[#8899a6]"
                    />
                    {errors.content && (
                        <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
                    )}

                    <div className="flex justify-end mt-3">
                        <Button
                            type="submit"
                            variant="default"
                            disabled={isSubmitting}
                            className="rounded-full px-6 cursor-pointer"
                        >
                            Postar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
