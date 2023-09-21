import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './features/auth/components/RequireAuth';
import Home from './features/home/Home';
import Auth from './features/auth/Auth';

function App() {
  return (
    <Routes path="/" element={<Outlet />}>
      <Route path="/auth" element={<Auth />} />

      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />}></Route>
      </Route>
    </Routes>
  );
}
export default App;
