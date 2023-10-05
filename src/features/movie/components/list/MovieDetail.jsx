import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useFetchMovieQuery } from '../../../../app/api/movieService';
import './List.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BuyTicketModal from '../../../ticket/components/BuyTicketModal';
import { useFetchShowTimeQuery } from '../../../../app/api/showtimeService';
import { setMovie } from '../../../../app/store/bookingSlice';

const MovieDetail = ({ movie }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const { searchString } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [showBuyTicketModal, setShowBuyTicketModal] = useState(false);

  const { data: showtimes, isLoading } = useFetchShowTimeQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handlePlayClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleBuyTicketClick = () => {
    dispatch(setMovie(movie));
    setShowBuyTicketModal(true);
  };

  const handleCloseBuyTicketClick = () => {
    setShowBuyTicketModal(false);
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
            <Tooltip title={movie.name} trigger={'hover'}>
              <Link to={`/detail/${movie.id}`} className="movie__title">
                {movie.name}
              </Link>
            </Tooltip>
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

          <Button
            className="text-white font-bold text-base w-full flex justify-center items-center bg-blue-500 mt-4 pt-5 pb-5 hover:bg-opacity-70"
            onClick={handleBuyTicketClick}
          >
            MUA VÉ
          </Button>
          <BuyTicketModal
            movie={movie}
            visible={showBuyTicketModal}
            onClose={handleCloseBuyTicketClick}
            showtimes={showtimes}
          />
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
