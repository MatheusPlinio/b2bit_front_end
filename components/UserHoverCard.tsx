"use client"

import { useFollowToggle, useHoverUserInfo } from "@/hooks/api/follow"
import Image from "next/image"

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .slice(0, 2)
        .join("");
};

export function UserHoverCard({ userId }: { userId: number }) {
    const { data, isLoading } = useHoverUserInfo(userId)
    const { mutate: toggleFollow, isPending } = useFollowToggle(userId)

    const initials = data ? getInitials(data.username) : "";

    if (isLoading || !data) return <div className="p-4 text-sm">Loading...</div>

    return (
        <div className="w-64 p-4 rounded-lg shadow-md border bg-white space-y-2">
            <div className="flex items-center gap-3">
                {data.avatar ? (
                    <Image
                        src={data.avatar}
                        alt={data.username}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                        {initials}
                    </div>
                )}

                <div>
                    <div className="font-semibold">@{data.username}</div>
                </div>
            </div>

            <button
                onClick={() => toggleFollow()}
                disabled={isPending}
                className="px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
            >
                {isPending ? "..." : data.is_following ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}
