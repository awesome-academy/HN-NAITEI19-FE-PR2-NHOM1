import React from 'react';
import Layout from '../../components/Layout/Layout';
import Seat from './components/Seat';
import { useParams } from 'react-router';

const BookTicket = () => {
  const { id } = useParams();

  return (
    <Layout>
      <Seat showtimeId={id} />
    </Layout>
  );
};

export default BookTicket;
