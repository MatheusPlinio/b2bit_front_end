'use client';

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface UserProfileCardProps {
    userId: number;
}

interface UserData {
    id: number;
    username: string;
    name: string;
    image?: string;
    banner?: string;
    bio?: string;
    followers_count: number;
    following_count: number;
}

export function UserProfileCard({ userId }: UserProfileCardProps) {
    const { data: user, isLoading, error } = useQuery<UserData>({
        queryKey: ['user', userId],
        queryFn: async () => {
            const res = await api.get(`/api/user/${userId}/`);
            return res.data;
        },
        enabled: !!userId,
    });

    if (isLoading) return <p className="text-center mt-4">Carregando perfil...</p>;
    if (error || !user) return <p className="text-center mt-4">Erro ao carregar perfil.</p>;

    const avatarUrl = "/default-avatar.jpg";
    const bannerUrl = "/user-banner.jpg";
    const username = user.username;
    const name = "Sem nome";
    const bio = "Esta pessoa ainda não escreveu uma bio.";
    const followingCount = 0;
    const followersCount = 0;

    return (
        <div className="flex justify-center px-4 mt-2">
            <div className="w-full max-w-2xl">
                <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                    <div className="h-36 w-full relative">
                        <Image
                            src={bannerUrl}
                            alt="Banner"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="p-4 pt-0">
                        <div className="relative -mt-12 flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                                <Image
                                    src={avatarUrl}
                                    alt={username}
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-10">
                                <h1 className="text-xl font-bold text-gray-900">@{username}</h1>
                                <p className="text-sm text-gray-500">{name}</p>
                            </div>
                        </div>

                        <p className="mt-4 text-gray-700 text-sm whitespace-pre-line">{bio}</p>

                        <div className="flex gap-4 mt-4 text-sm text-gray-600">
                            <div>
                                <span className="font-semibold text-gray-900">{followingCount}</span> seguindo
                            </div>
                            <div>
                                <span className="font-semibold text-gray-900">{followersCount}</span> seguidores
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
