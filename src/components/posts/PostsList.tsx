import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/reduxtypehooks';
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from '../../store/slices/postsSlice';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
function PostsList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

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
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>
        <p className="postcredit">
          <PostAuthor userId={post?.userId} />
          <TimeAgo timestamp={post.date} />
        </p>{' '}
        <ReactionButtons post={post} />
      </article>
    ));
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}
export default PostsList;
