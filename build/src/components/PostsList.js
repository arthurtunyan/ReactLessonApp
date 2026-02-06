import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import PostItem from "./PostItem.jsx";
const StyledPostsList = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const PostsList = ({ posts }) => {
    return (_jsx(StyledPostsList, { children: posts.map((post) => ( //goes thorugh all of them
        _jsx(PostItem, { post: post }, post.id))) }));
};
export default PostsList;
//# sourceMappingURL=PostsList.js.map