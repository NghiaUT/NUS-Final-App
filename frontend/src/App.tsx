import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes';

function App() {
  // Thiết lập route cho dự án.
  return (
    <RouterProvider router={router} />
  );
}

export default App;
