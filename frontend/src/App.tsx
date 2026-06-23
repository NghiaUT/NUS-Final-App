import './App.css'

import Feed from './pages/Home/Feed'
import { Route, Routes } from 'react-router-dom'
import DummyPage from './pages/DummyPage'
import MainLayout from './layouts/MainLayout'
import Discover from './pages/Home/Discover'

function App() {

  // Thiết lập route cho dự án.
  return (
    <Routes>
      {/* Route này không có header và sidebar */}
      <Route path="/login" element={<DummyPage name="Login Page" />}/>
      <Route path="/signup" element={<DummyPage name="Signup Page" />}/>

      {/* Các Route sau đều yêu cầu layout có header và sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Feed />} />
        <Route path="/discover" element={<Discover />} />
      </Route>

      {/* Bắt các route không có trong dự án. */}
      <Route path="*" element={<DummyPage name="Không có trong dự án" />} />
    </Routes>
  )
}

export default App
