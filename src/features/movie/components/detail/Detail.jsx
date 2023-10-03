import './Detail.css';
import { useFetchMovieQuery } from '../../../../app/api/movieService';
import { RightOutlined } from '@ant-design/icons';
import { Rate, Button, Modal, Alert } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useNewRateMutation,
  useUpdateRateMutation,
  useGetMovieRatesQuery,
} from '../../../../app/api/rateService';

const Detail = ({ movieId }) => {
  const { data: movie, isLoading: movieLoading } = useFetchMovieQuery(movieId);
  const { data: movieRates, isLoading: rateLoading } =
    useGetMovieRatesQuery(movieId);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rate, setRate] = useState(5);
  const navigate = useNavigate();
  const [newRate] = useNewRateMutation();
  const [updateRate] = useUpdateRateMutation();
  const rateTotal =
    movieRates?.reduce((total, item) => {
      return total + item.rate;
    }, 0) / movieRates?.length;

  const user = JSON.parse(localStorage.getItem('user'));
  if (movieLoading || rateLoading) {
    return <p>Loading...</p>;
  }
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    if (!user) {
      navigate('/auth');
    }

    setConfirmLoading(true);
    try {
      const ratedMovie = movieRates.filter((item) => {
        return item.userId === user.id && item.movieId === movieId;
      })[0];
      if (!ratedMovie) {
        newRate({
          userId: user.id,
          movieId,
          rate,
        });
      } else {
        updateRate({
          id: ratedMovie.id,
          userId: user.id,
          movieId,
          rate,
        });
      }
    } catch (error) {
      console.log('failed');
    }
    setConfirmLoading(false);
    hideModal();
  };
  const hideModal = () => {
    setOpen(false);
  };
  const categoriesString = movie && movie.categories.join(', ');
  const performerString = movie && movie.performer.join(', ');
  return (
    <>
      <div className="detail">
        <div className="title mb-12 text-2xl font-bold">
          <span className="mr-2">Trang chủ</span>
          <span className="">
            <RightOutlined />
          </span>
          <span className="movie-name ml-2">{movie?.name}</span>
        </div>
        <div>
          <div className="content flex gap-11">
            <div className="poster w-1/5">
              <img
                src={movie.image}
                alt={movie.name}
                className="movie__image"
              />
              <span className="iconFilm">
                <img src={movie.iconFilm} alt="" />
              </span>
            </div>
            <div className="content w-4/5">
              <div className="title text-3xl font-bold mb-5">{movie.name}</div>
              <div className="text-base mb-5">{movie.description}</div>
              <div className="flex">
                <div className="w-2/5">
                  <span className="text-base font-semibold">ĐẠO DIỄN:</span>
                </div>
                <div className="w-3/5 text-base">{movie.director}</div>
              </div>
              <div className="flex">
                <div className="w-2/5">
                  <span className="text-base font-semibold">DIỄN VIÊN:</span>
                </div>
                <div className="w-3/5 text-base">{performerString}</div>
              </div>
              <div className="flex">
                <div className="w-2/5">
                  <span className="text-base font-semibold">THỂ LOẠI:</span>
                </div>
                <div className="w-3/5 text-base">{categoriesString}</div>
              </div>
              <div className="flex">
                <div className="w-2/5">
                  <span className="text-base font-semibold">THỜI LƯỢNG:</span>
                </div>
                <div className="w-3/5 text-base">{movie.duration} phút</div>
              </div>
              <div className="flex">
                <div className="w-2/5">
                  <span className="text-base font-semibold">NGÔN NGỮ:</span>
                </div>
                <div className="w-3/5 text-base">{movie.language}</div>
              </div>
              <div className="flex">
                <div className="w-2/5">
                  <span className="text-base font-semibold">
                    NGÀY KHỞI CHIẾU:
                  </span>
                </div>
                <div className="w-3/5 text-base">{movie.openDate}</div>
              </div>
              <div className="flex">
                <div className="w-2/5">
                  <span className="text-base font-semibold">ĐÁNH GIÁ:</span>
                </div>
                <div className="w-3/5 text-base">
                  {movieRates.length === 0
                    ? 'Chưa có đánh giá'
                    : rateTotal + '/5'}
                </div>
              </div>
            </div>
          </div>
          <div className="rate w-full mt-4 text-xl font-semibold">
            <Button className="bg-blue-600" type="primary" onClick={showModal}>
              {'Đánh giá (' + movieRates.length + ')'}
            </Button>
          </div>
        </div>
      </div>
      <div className="trailer ">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="trailer-title text-3xl font-bold pb-3 mb-10 pr-2 pl-2">
            TRAILER
          </div>
          <div className="border border-white rounded">
            <iframe
              width="840"
              height="472.5"
              src={movie.linkPreview}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Modal
        title={user ? 'Rate' : 'Bạn cần phải đăng nhập trước!'}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={hideModal}
        okText={user ? 'Đánh giá' : 'OK'}
      >
        {user ? (
          <Rate
            allowHalf
            defaultValue={5}
            allowClear={false}
            onChange={(value) => setRate(value)}
          />
        ) : (
          <span>Đến trang đăng nhập ?</span>
        )}
      </Modal>
    </>
  );
};

export default Detail;
