export interface Post {
    id: number;
    content: string;
    created_at: string;
    likes_count: number;
    is_liked: boolean;
    author: {
        id: number;
        username: string;
        email?: string;
    };
}