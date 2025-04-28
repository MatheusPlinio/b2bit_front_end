'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const boardSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

type BoardFormValues = z.infer<typeof boardSchema>;

export const CreateBoardForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BoardFormValues>({
        resolver: zodResolver(boardSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: BoardFormValues) => {
        try {
            await axios.post("/boards", data);
            router.push("/dashboard");
        } catch (error) {
            console.error("Failed to create board:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...register("description")} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Board"}
            </Button>
        </form>
    );
};