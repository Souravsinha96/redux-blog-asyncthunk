import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/reduxtypehooks';
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from '../../store/slices/postsSlice';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
function PostsList() {
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  let content;
  if (status) {
    content = <h1>Loading...</h1>;
  }
  if (error) {
    alert(error);
  } else {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <article key={post.id}>
        <h2>{post.title}</h2>
        <p className="excerpt">{post.body.substring(0, 75)}...</p>
        <p className="postcredit">
          {' '}
          <Link to={`post/${post.id}`}>View Post</Link>{' '}
          <PostAuthor userId={post?.userId} />
          <TimeAgo timestamp={post.date} />
        </p>{' '}
        <ReactionButtons post={post} />
      </article>
    ));
  }

  return <section>{content}</section>;
}
export default PostsList;
