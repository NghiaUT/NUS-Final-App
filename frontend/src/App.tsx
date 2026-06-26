import './App.css';

import Feed from './pages/Home/Feed';
import { Route, Routes } from 'react-router-dom';
// import DummyPage from './pages/DummyPage';
import MainLayout from './layouts/MainLayout';
import Discover from './pages/Home/Discover';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFound from './pages/NotFound';
import NewPhoto from './pages/AddEdit/NewPhoto';
import NewAlbum from './pages/AddEdit/NewAlbum';
import EditPhoto from './pages/AddEdit/EditPhoto';
import EditAlbum from './pages/AddEdit/EditAlbum';

function App() {
  // Thiết lập route cho dự án.
  return (
    <Routes>
      {/* Route này không có header và sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Các Route sau đều yêu cầu layout có header và sidebar */}
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Feed />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add/photo" element={<NewPhoto />} />
        <Route path="/add/album" element={<NewAlbum />} />
        <Route path="/edit/photo/:photoId" element={<EditPhoto />} />
        <Route path="/edit/album/:photoId" element={<EditAlbum />} />
      </Route>

      {/* Bắt các route không có trong dự án. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
