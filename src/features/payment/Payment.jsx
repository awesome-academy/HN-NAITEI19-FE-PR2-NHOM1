import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout';
import Infor from './components/Infor';

const Payment = () => {

  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const showtimeParam = urlSearchParams.get('showtime');
    const selectedSeatsParam = urlSearchParams.get('selectedSeats');

    if (showtimeParam && selectedSeatsParam) {
      const showtime = JSON.parse(showtimeParam);
      const selectedSeats = JSON.parse(selectedSeatsParam);

      setShowtime(showtime);
      setSelectedSeats(selectedSeats);
    }
  }, []);

  return (
    <Layout>
      <Infor showtime={showtime} selectedSeats={selectedSeats}/>
    </Layout>

  );
};

export default Payment
