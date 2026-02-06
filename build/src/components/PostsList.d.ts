import type { FC } from "react";
interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}
interface PostsListProps {
    posts: Post[];
}
declare const PostsList: FC<PostsListProps>;
export default PostsList;
//# sourceMappingURL=PostsList.d.ts.map