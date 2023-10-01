import React  from 'react';
import { useGetShowtimeByIdQuery } from '../../list/showtimeService';
import SeatsList from './SeatsList';

const Seat = ({ showtimeId, countdown }) => {
  const { data: showtime, isLoading: showtimeLoading } =
    useGetShowtimeByIdQuery(showtimeId);
  if (showtimeLoading || !showtime) {
    return <p>Loading...</p>;
  }

  return <SeatsList showtime={showtime} />;
};

export default Seat;
