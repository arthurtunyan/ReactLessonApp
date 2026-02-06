export interface Types {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface PostItemProps {
    post: Types;
    showPost?: boolean;
}

export interface PostsListProps {
    posts: Types[];
}

export type TodoId = number | string;

export type Todo = {
    id: TodoId;
    title: string;
    completed: boolean;
    userId: number;
};

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

export type Id = number;
export type UserId = number;
export type PostId = number;

export interface Post {
    id: PostId;
    userId: UserId;
    title: string;
    body: string;
}



//interace because it is better for shared objects