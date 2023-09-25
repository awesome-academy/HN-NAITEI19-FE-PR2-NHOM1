import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './features/auth/components/RequireAuth';
import Home from './features/home/Home';
import Auth from './features/auth/Auth';
import TicketPrice from './features/auth/TicketPrice/TicketPrice';
import RequireAdmin from './features/admin/components/RequireAdmin';
import Admin from './features/admin/Admin';
import Movies from './features/admin/components/movies/Movies';
import EventPage from './features/EventPage';

function App() {
  return (
    <Routes path="/" element={<Outlet />}>
      <Route path="/auth" element={<Auth />} />
      <Route path="/ticket_price" element={<TicketPrice />} />
      <Route path='/news' element={<EventPage />} />

      <Route element={<RequireAuth />}>
        <Route path='/' element={<Home />}></Route>
      </Route>

      <Route element={<RequireAdmin />}>
        <Route path="admin">
          <Route index element={<Admin />} />
          <Route path="movies" element={<Movies />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
