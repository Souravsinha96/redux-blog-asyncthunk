import { useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/reduxtypehooks';
import { addNewPosts } from '../../store/slices/postsSlice';
import { selectAllUsers } from '../../store/slices/usersSlice';

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPosts({ title, body: content, userId })).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Failed to save post,', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />{' '}
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
