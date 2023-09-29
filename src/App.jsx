import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './features/auth/components/RequireAuth';
import Home from './features/home/Home';
import Auth from './features/auth/Auth';
import TicketPrice from './features/auth/TicketPrice/TicketPrice';
import RequireAdmin from './features/admin/components/RequireAdmin';
import Admin from './features/admin/Admin';
import Movies from './features/admin/components/movies/Movies';
import MovieEdit from './features/admin/components/movies/Edit';
import Detail from './features/admin/components/movies/Detail';
import Create from './features/admin/components/movies/Create';
import EventPage from './features/EventPage';
import DetailMovie from './features/moviedetail/DetailMovie';
import UserTable from './features/admin/components/userTable/UserTable';
import CinemaDetail from './features/cinemaDetail/CinemaDetail';
function App() {
  return (
    <Routes path="/" element={<Outlet />}>
      <Route path="/auth" element={<Auth />} />
      <Route path="/ticket_price" element={<TicketPrice />} />
      <Route path="/news" element={<EventPage />} />
      <Route path="/cinema" element={<CinemaDetail />} />
      <Route path="/detail/:id" element={<DetailMovie />} />
      <Route path="/" element={<Home />} />

      <Route element={<RequireAuth />}></Route>

      <Route element={<RequireAdmin />}>
        <Route path="admin">
          <Route index element={<Admin />} />
          <Route path="users" element={<UserTable />} />
          <Route path="movies">
            <Route index element={<Movies />} />
            <Route path="create" element={<Create />} />
            <Route path=":id" element={<Detail />} />
            <Route path="edit/:id" element={<MovieEdit />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
