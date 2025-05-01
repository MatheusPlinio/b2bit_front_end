'use client';

import api from "@/lib/axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import CreatePostForm from "./CreatePostForm";
import { useSession } from "next-auth/react";
import { Edit3 } from "lucide-react";
import { useState } from "react";
import EditPostForm from "./EditPostForm";
import DeletePostButton from "./DeletePostButton";
import { LikeButton } from "./LikeButton";

type Post = {
    id: number;
    content: string;
    created_at: string;
    likes_count: number;
    is_liked: boolean;
    author: {
        id: number;
        username: string;
        email: string;
    };

};

const fetchPosts = async (): Promise<Post[]> => {
    const res = await api.get('api/posts/');
    return res.data;
};

export function Feed() {
    const { data: session } = useSession();
    const userId = session?.user.id;

    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const handleEditClick = (post: Post) => {
        setEditingPostId(post.id);
    };
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p>Carregando feed...</p>;
    if (error instanceof Error) {
        toast.error(error.message);
        return <p>Erro ao carregar posts</p>;
    }

    return (
        <div className="flex justify-center mt-8 px-4">
            <div className="w-full max-w-2xl">
                <CreatePostForm />
                {posts?.map((post) => (
                    <div key={post.id} className="relative border-t border-b border-gray-950 p-4">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-950"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-950"></div>

                        <div className="text-sm text-muted-foreground">
                            @{post.author.username} •{" "}
                            <span className="text-xs">
                                {new Date(post.created_at).toLocaleString()}
                            </span>
                        </div>

                        {editingPostId === post.id ? (
                            <EditPostForm
                                postId={post.id}
                                initialContent={post.content}
                                onCancel={() => setEditingPostId(null)}
                            />
                        ) : (
                            <div>
                                <p className="text-base mt-2 whitespace-pre-wrap">{post.content}</p>
                                <LikeButton
                                    postId={post.id}
                                    likesCount={post.likes_count}
                                    isLiked={post.is_liked}
                                />
                            </div>
                        )}

                        {post.author.id === userId && editingPostId !== post.id && (
                            <div className="flex gap-2 absolute top-2 right-2">
                                <button
                                    onClick={() => handleEditClick(post)}
                                    className="absolute top-2 right-2 text-muted-foreground hover:text-blue-500"
                                >
                                    <Edit3 size={16} />
                                </button>
                                <DeletePostButton postId={post.id} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
