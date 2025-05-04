'use client';
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Post } from "@/types/Post";
import { toast } from "sonner";
import CreatePostForm from "./CreatePostForm";
import EditPostForm from "./EditPostForm";
import { LikeButton } from "./LikeButton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { UserHoverCard } from "./UserHoverCard";
import { Edit3 } from "lucide-react";
import DeletePostButton from "./DeletePostButton";

interface UserPostsProps {
    userId?: number;
}

const fetchPosts = async (userId?: number): Promise<Post[]> => {
    const res = await api.get('api/posts/', {
        params: {
            user_id: userId,
        },
    });

    if (res.status === 202) {
        throw new Error("Feed ainda em processamento");
    }

    return res.data;
};

export default function UserPosts({ userId }: UserPostsProps) {
    const { data: session } = useSession();
    const authenticatedUserId = session?.user.id;

    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const handleEditClick = (post: Post) => {
        setEditingPostId(post.id);
    };

    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => fetchPosts(userId),
        enabled: !!userId,
        retry: 2,
        retryDelay: 1000,
    });

    if (isLoading) return <p>Carregando feed...</p>;
    if (error instanceof Error) {
        toast.error(error.message);
        return <p>Erro ao carregar posts</p>;
    }

    return (
        <div className="flex justify-center px-4 bg-[#f4f5f7] min-h-screen">
            <div className="w-full max-w-2xl space-y-4">
                <CreatePostForm />
                {posts?.map((post) => (
                    <div
                        key={post.id}
                        className="relative border border-[#e0e0e0] rounded-xl p-4 bg-white text-[#1c1e21] shadow-sm"
                    >
                        <div className="text-sm text-[#5f6b7a] mb-2">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <span className="font-semibold cursor-pointer text-[#1a73e8] hover:underline">
                                        @{post.author.username}
                                    </span>
                                </HoverCardTrigger>
                                <HoverCardContent className="p-0 w-64">
                                    <UserHoverCard userId={post.author.id} />
                                </HoverCardContent>
                            </HoverCard>{" "}
                            •{" "}
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
                                <p className="text-base mt-1 whitespace-pre-wrap">{post.content}</p>
                                <LikeButton
                                    postId={post.id}
                                    likesCount={post.likes_count}
                                    isLiked={post.is_liked}
                                />
                            </div>
                        )}

                        {post.author.id === authenticatedUserId && editingPostId !== post.id && (
                            <div className="flex gap-2 absolute top-2 right-2 text-[#8899a6]">
                                <button
                                    onClick={() => handleEditClick(post)}
                                    className="hover:text-[#1da1f2] transition-colors"
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
