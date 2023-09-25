import React from "react";
import Layout from "../../components/Layout/Layout";
import Carousel from "../../components/Carousel/Carousel";
import MovieList from "../../components/List/MovieList";

function Home() {
  return (
    <Layout>
      <div>
        <Carousel />
        <MovieList />
      </div>
    </Layout>
  );
}

export default Home;
