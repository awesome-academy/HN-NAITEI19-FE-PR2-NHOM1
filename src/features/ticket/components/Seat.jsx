import React from 'react';
import { useGetShowtimeByIdQuery } from '../../../app/api/showtimeService';
import SeatsList from './SeatsList';
import { useDispatch } from 'react-redux';
import { setMovie, setShowtime } from '../../../app/store/bookingSlice';

const Seat = ({ showtimeId, countdown }) => {
  const { data: showtime, isLoading: showtimeLoading } =
    useGetShowtimeByIdQuery(showtimeId);
  const dispatch = useDispatch();

  if (showtime) {
    dispatch(setShowtime(showtime));
    dispatch(setMovie(showtime.movie));
  }

  if (showtimeLoading || !showtime) {
    return <p>Loading...</p>;
  }

  const bookedSeats = showtime.bookings?.reduce((bookedSeats, item) => {
    return (bookedSeats = [...bookedSeats, ...item.seat]);
  }, []);

  return <SeatsList showtime={showtime} bookedSeats={bookedSeats} />;
};

export default Seat;
