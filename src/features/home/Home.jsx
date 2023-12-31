import React from 'react';
import Layout from '../../components/Layout/Layout';
import Carousel from '../../components/Carousel/Carousel';
import MovieList from '../movie/components/list/MovieList';

function Home() {
  return (
    <Layout>
      <Carousel />
      <MovieList />
    </Layout>
  );
}

export default Home;
