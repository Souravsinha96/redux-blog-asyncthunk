import Layout from './components/Layout';
import AddPostForm from './components/posts/AddPostForm';
import EditPostForm from './components/posts/EditPostForm';
import PostsList from './components/posts/PostsList';
import SinglePostPage from './components/posts/SinglePostPage';
import { fetchPosts } from './store/slices/postsSlice';
import { fetchUsers } from './store/slices/usersSlice';
import { store } from './store/store';
import { Routes, Route } from 'react-router-dom';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />{' '}
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
