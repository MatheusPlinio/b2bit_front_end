
import UserPosts from "@/components/UserPosts";
import { UserProfileCard } from "@/components/UserProfileCard";

interface ProfilePageProps {
    params: {
        id: number;
    };
}

export default function ProfilePage({ params }: ProfilePageProps) {

    const userId = params.id;
    return (
        <div>
            <UserProfileCard userId={userId} />
            <UserPosts
                userId={userId}
            />
        </div>
    );
}