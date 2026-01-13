import styled from "styled-components";
import PropTypes from "prop-types";

const StyledPostCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 12px;
    background-color: #fff;
`;

const StyledPostTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 16px;
`;

const StyledPostBody = styled.p`
    margin: 0;
    font-size: 14px;
    color: #555;
`;
function PostItem(props) {
    return (
        <StyledPostCard>
            <p
                style={{
                    fontSize: "12px",
                    color: "#777",
                }}
            >
                User {props.post.userId} Post {props.post.id}
            </p>

            <StyledPostTitle>Title: {props.post.title}</StyledPostTitle>
            <StyledPostBody>Body: {props.post.body}</StyledPostBody>
        </StyledPostCard>
    )
}
PostItem.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired,
}
export default PostItem;