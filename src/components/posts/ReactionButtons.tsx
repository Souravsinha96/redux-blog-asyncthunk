import { useAppDispatch } from '../../store/reduxtypehooks';
import {
  postStateType,
  reaction,
  reactionAdded,
} from '../../store/slices/postsSlice';

enum reactionEmoji {
  thumbsUp = '👍',
  wow = '😮',
  heart = '❤️',
  rocket = '🚀',
  coffee = '☕',
}

const ReactionButtons = ({ post }: { post: postStateType }) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name as keyof reaction]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
