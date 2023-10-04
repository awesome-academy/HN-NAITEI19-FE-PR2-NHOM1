import React from 'react';
import MovieDetail from './MovieDetail';
import { useGetMoviesQuery } from '../../../../app/api/movieService';

const TabList = ({ movieStatus }) => {
  const { data: movies, isLoading } = useGetMoviesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filteredMovies = movies?.filter((item) => item.status === movieStatus);

  return (
    <div>
      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredMovies?.map((item) => (
          <MovieDetail key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
};

export default TabList;
