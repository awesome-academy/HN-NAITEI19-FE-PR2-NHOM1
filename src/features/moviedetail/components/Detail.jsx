import React, { useState } from 'react';
import './Detail.css';
import { useFetchMovieQuery } from '../../list/movieService';
import { RightOutlined, FacebookFilled } from '@ant-design/icons';
import { Select, Input } from 'antd';
const { Option } = Select;

const Detail = ({ movieId }) => {
  const { data: movie, isLoading } = useFetchMovieQuery(movieId);
  if (isLoading) {
    return <p>Loading...</p>;
  }

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
          <span className="movie-name ml-2">{movie.name}</span>
        </div>
        <div className="content flex gap-11">
          <div className="poster w-1/5">
            <img src={movie.image} alt={movie.name} className="movie__image" />
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
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
