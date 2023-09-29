import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import Detail from './components/detail/Detail';
const DetailMovie = ({ movieId }) => {
  const { id } = useParams();

  return (
    <Layout>
      <Detail movieId={id} />
    </Layout>
  );
};

export default DetailMovie;
