import { useAppSelector } from '../../store/reduxtypehooks';
import { selectAllUsers } from '../../store/slices/usersSlice';

const PostAuthor = ({ userId }: { userId: string | undefined }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
export default PostAuthor;
