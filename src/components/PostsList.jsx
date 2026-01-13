import styled from "styled-components"
import PostItem from "./PostItem";
import PropTypes from "prop-types";

const StyledPostsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function PostsList({posts}) {
    return (
        <StyledPostsList>
            {posts.map((post) => ( //goes thorugh all of them
                <PostItem key={post.id} post={post}/>
            ))}
        </StyledPostsList>
    );
}
PostsList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default PostsList;