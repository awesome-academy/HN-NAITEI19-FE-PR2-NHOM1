import dayjs from 'dayjs';

import ShowtimeCard from './ShowtimeCard';
function ListShowTime({ data }) {
  const formatData = data?.reduce((list, movie) => {
    const sameMovie = list.filter(
      (item) => item.movie.id === movie.movie.id
    )[0];
    if (sameMovie) {
      const newList = list.map((item) => {
        if (item.movie.id === sameMovie.movie.id) {
          return {
            movie: movie.movie,
            time: [...movie.time, ...sameMovie.time],
          };
        } else return item;
      });
      return newList;
    }

    return [...list, movie];
  }, []);
  return (
    <div>
      {formatData &&
        formatData.map((item) => {
          return (
            <ShowtimeCard
              key={item.movie.id}
              movie={item.movie}
              time={item.time}
            ></ShowtimeCard>
          );
        })}
    </div>
  );
}

export default ListShowTime;
