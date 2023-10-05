import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Infor from './components/Infor';
import { useSelector } from 'react-redux';

const Payment = () => {
  const {
    showtime,
    seats: selectedSeats,
    movie,
  } = useSelector((state) => state.booking);

  return (
    <Layout>
      <Infor showtime={showtime} selectedSeats={selectedSeats} movie={movie} />
    </Layout>
  );
};

export default Payment;
