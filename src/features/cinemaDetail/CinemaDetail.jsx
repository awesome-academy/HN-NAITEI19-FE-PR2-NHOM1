import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import Layout from '../../components/Layout/Layout';
import { useGetCinemaQuery } from './cinemaService';
import { useGetShowtimeDetailQuery } from '../list/showtimeService';
import MovieDetail from '../../components/List/MovieDetail';
function CinemaDetail() {
  const { cinema } = useSelector((state) => state.CinemaSlice);
  const { data, isLoading: cinemaLoading } = useGetCinemaQuery(cinema);
  const { data: movies, isLoading } = useGetShowtimeDetailQuery();

  const filteredMovies = movies?.filter((item) => item.movieStatus === 2);

  return (
    <Layout>
      {isLoading || cinemaLoading ? (
        <span>Loading ...</span>
      ) : (
        <section className="max-w-screen-xl mx-auto my-10">
          <Row className="my-4">
            <Col md={24} xl={12} className="px-3">
              <h2 className="uppercase text-2xl font-semibold mb-6">
                {cinema}
              </h2>
              <img src={data[0]?.img} alt="cinema-img" className="mb-6" />
              <div
                dangerouslySetInnerHTML={{ __html: data[0]?.description }}
                className="text-xl "
              />
            </Col>
            <Col md={24} xl={12} className="px-3">
              <h2 className="uppercase text-3xl text-center font-bold mb-6">
                PHIM ĐANG HOT
              </h2>
              <Row>
                {filteredMovies.map((movie, index) => {
                  if (index < 4) {
                    return (
                      <Col
                        key={movie.movieId}
                        md={24}
                        xl={12}
                        className="px-3 my-4"
                      >
                        <MovieDetail
                          key={movie.id}
                          movieId={movie.movieId}
                          movieStatus={movie.movieStatus}
                        />
                      </Col>
                    );
                  }
                })}
              </Row>
            </Col>
          </Row>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15667.426542922458!2d106.659389!3d10.974192!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1d4bb751437%3A0x338f14707cb1c166!2zUuG6oXAgQmV0YSBFbXBpcmUgQsOsbmggRMawxqFuZw!5e0!3m2!1sen!2sus!4v1695909068165!5m2!1sen!2sus"
            className="w-full h-80"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section>
      )}
    </Layout>
  );
}

export default CinemaDetail;
