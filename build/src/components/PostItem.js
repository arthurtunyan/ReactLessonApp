import { jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTheme } from "../Context/ThemeContext";
const StyledPostCard = styled.div `
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 12px;
    background-color: #fff;
    margin: ${props => props.hasMargin ? "10px" : "0px"};
`;
const StyledPostTitle = styled.h3 `
    margin: 0 0 4px 0;
    font-size: 16px;
`;
const StyledPostBody = styled.p `
    margin: 0;
    font-size: 14px;
    color: #555;
`;
function PostItem(props) {
    const theme = useTheme();
    console.log(theme);
    return (_jsxs(StyledPostCard, { hasMargin: props.post.id % 2 === 0, children: [_jsxs("p", { style: {
                    fontSize: "12px",
                    color: "#777",
                }, children: ["User ", props.post.userId, " Post ", props.post.id] }), _jsxs(StyledPostTitle, { children: ["Title: ", props.post.title] }), _jsxs(StyledPostBody, { children: ["Body: ", props.post.body] })] }));
}
PostItem.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired,
    showPost: PropTypes.bool.isRequired
};
//basically says that postitem must receive a prop called post
//post must be an object with this specific structure where id is number, userId is number, title is string, etc etc and
// that all of this is required and the post object itself is also required
export default PostItem;
//# sourceMappingURL=PostItem.js.map
//# sourceMappingURL=PostItem.js.map