import React, { useEffect, useState } from 'react';
import MovieDetail from './MovieDetail';
import { useGetShowtimeDetailQuery } from '../../../../app/api/showtimeService';

const TabList = ({ movieStatus }) => {
  const { data: movies, isLoading } = useGetShowtimeDetailQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filteredMovies = movies?.filter(
    (item) => item.movieStatus === movieStatus
  );

  return (
    <div>
      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredMovies?.map((item) => (
          <MovieDetail
            key={item.id}
            movieId={item.movieId}
            movieStatus={item.movieStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default TabList;
