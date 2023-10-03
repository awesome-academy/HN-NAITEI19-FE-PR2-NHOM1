import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useFetchMovieQuery } from '../../features/list/movieService';
import './List.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MovieDetail = ({ movieId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const { searchString } = useSelector((state) => state.filter);

  const { data: movie, isLoading } = useFetchMovieQuery(movieId);

  const handlePlayClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const categoriesString = movie && movie.categories.join(', ');

  return (
    <>
      {isLoading ||
      !movie?.name.toLowerCase().includes(searchString.toLowerCase()) ? (
        <></>
      ) : (
        <div className="item">
          <div
            className="view"
            onMouseEnter={() => setShowPlayButton(true)}
            onMouseLeave={() => setShowPlayButton(false)}
          >
            <img src={movie.image} alt={movie.name} className="movie__image" />
            <span className="iconFilm">
              <img src={movie.iconFilm} alt="" />
            </span>
            {movie.linkPreview && showPlayButton && (
              <div className="overlay">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlayCircleOutlined />}
                  size="large"
                  onClick={handlePlayClick}
                  className="play-button"
                />
              </div>
            )}
          </div>
          <div className="content">
            <Link to={`/detail/${movie.id}`} className="movie__title">
              {movie.name}
            </Link>
            <div className="movies__categories">
              <strong>Thể loại: </strong>
              {categoriesString}
            </div>
            <div className="movie__duration">
              <strong>Thời lượng: </strong>
              {movie.duration} phút
            </div>
            <div className="movie__openDate">
              <strong>Ngày khởi chiếu: </strong>
              {movie.openDate}
            </div>
          </div>
        </div>
      )}

      <Modal
        title={
          movie && <div className="preview__title">TRAILER - {movie.name}</div>
        }
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        destroyOnClose
        width={700}
        height={600}
        style={{ maxHeight: '80vh' }}
      >
        {movie && (
          <div className="flex items-center justify-center h-full pb-6">
            <iframe
              width="560"
              height="315"
              src={movie.linkPreview}
              title={movie.name}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </Modal>
    </>
  );
};

export default MovieDetail;
