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

    const mutation = useMutation({
        mutationFn: async (data: PostFormData) => {
            await api.post('api/post/', data)
        },
        onSuccess: () => {
            toast.success('Post enviado!')
            reset()
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError: () => toast.error('Erro ao postar.')
    })

    const onSubmit = (data: PostFormData) => {
        mutation.mutate(data)
    }

    return (
        <div className="relative border-t border-b border-gray-950 p-4 bg-gray-100">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-950" />
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-950" />

            <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full text-lg">
                    👤
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
                    <Textarea
                        {...register('content')}
                        placeholder="O que está acontecendo?"
                        className="resize-none text-sm border-gray-700"
                    />
                    {errors.content && (
                        <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
                    )}

                    <div className="flex justify-end mt-2">
                        <Button className='cursor-pointer' type="submit" variant="default" disabled={isSubmitting}>
                            Postar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
