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
import Showtimes from './features/admin/components/showtimes/Showtimes';
import BookTicket from './features/ticket/BookTicket';
import Payment from './features/payment/Payment';

function App() {
  return (
    <Routes path="/" element={<Outlet />}>
      <Route path="/auth" element={<Auth />} />
      <Route path="/ticket_price" element={<TicketPrice />} />
      <Route path="/news" element={<EventPage />} />
      <Route path="/cinema" element={<CinemaDetail />} />
      <Route path="/detail/:id" element={<DetailMovie />} />
      <Route path="/" element={<Home />} />

      <Route element={<RequireAuth />}>
        <Route path="/bookticket/:id" element={<BookTicket/>} />
        <Route path="/payment" element={<Payment/>}/>

      </Route>

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

          <Route path="showtimes" element={<Showtimes />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
