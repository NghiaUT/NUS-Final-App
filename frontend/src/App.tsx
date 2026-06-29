import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes';

// import Feed from './pages/Home/Feed';
// import { Route, Routes } from 'react-router-dom';
// // import DummyPage from './pages/DummyPage';
// import MainLayout from './layouts/MainLayout';
// import Discover from './pages/Home/Discover';
// import LoginPage from './pages/Auth/LoginPage';
// import SignupPage from './pages/Auth/SignupPage';
// import ProfilePage from './pages/Profile/ProfilePage';
// import NotFound from './pages/NotFound';
// import NewPhoto from './pages/AddEdit/NewPhoto';
// import NewAlbum from './pages/AddEdit/NewAlbum';
// import EditPhoto from './pages/AddEdit/EditPhoto';
// import EditAlbum from './pages/AddEdit/EditAlbum';

function App() {
  // Thiết lập route cho dự án.
  return (
    <RouterProvider router={router} />
  );
}

export default App;
