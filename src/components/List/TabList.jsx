import React, { useEffect, useState } from 'react'
import MovieDetail from './MovieDetail';
const TabList = ({movieStatus}) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/showtimeDetail');
        const data = await response.json();
        const filterData = data.filter((item) => item.movieStatus === movieStatus);
        
        setMovies(filterData);
        setLoading(false);
      } catch(error) {
        console.error('Error', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [movieStatus]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {
            movies.map((item) => (
              <li key={item.id}>
                <MovieDetail key={item.id} movieId={item.movieId} movieStatus ={item.movieStatus} />
              </li>
            ))
          }
        </ul>
      )}
    </div>
  )
}

export default TabList
