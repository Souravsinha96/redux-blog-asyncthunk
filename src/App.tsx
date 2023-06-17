import AddPostForm from './components/posts/AddPostForm';
import PostsList from './components/posts/PostsList';
import { fetchUsers } from './store/slices/usersSlice';
import { store } from './store/store';

store.dispatch(fetchUsers());
function App() {
  return (
    <div className="main">
      <AddPostForm />
      <PostsList />
    </div>
  );
}
export default App;
