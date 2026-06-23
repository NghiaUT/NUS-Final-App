import './App.css'

import Feed from './pages/Home/Feed'
import { Route, Routes } from 'react-router-dom'
import DummyPage from './pages/DummyPage'
import MainLayout from './layouts/MainLayout'
import Discovery from './pages/Home/Discovery'

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
        <Route path="/discover" element={<Discovery />} />
      </Route>
    </Routes>
  )
}

export default App
