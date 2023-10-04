import { useState } from 'react';
import { Modal, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

function ShowtimeCard({ movie, time }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div className="card w-full my-3 pb-3 border-b-2 flex">
        <div className="w-1/5 ">
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
        </div>
        <div className="ml-6 text-left">
          <Link
            to={`/detail/${movie.id}`}
            className="text-3xl text-blue-800 font-bold hover:text-red-600 hover:underline"
          >
            {movie.name}
          </Link>

          <p className="my-5 text-lg">
            {'Thể loại: ' + movie.categories.join(', ')}
          </p>

          {time?.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => navigate(`/bookticket/${item.showtimeId}`)}
              >
                <span className="p-3 mr-4 text-lg bg-gray-200 font-medium cursor-pointer hover:text-red-600">
                  {item.hour + ':' + item.minute}
                </span>
              </button>
            );
          })}
        </div>
      </div>
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
    </div>
  );
}

export default ShowtimeCard;
