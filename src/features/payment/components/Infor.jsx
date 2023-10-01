import React, { useState, useEffect } from 'react';
import Ticket from '../../ticket/components/Ticket';
import '../../ticket/components/Ticket.css';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  GoldOutlined,
  HomeOutlined,
  TagsOutlined,
  FundProjectionScreenOutlined,
  RightOutlined,
  UserOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Button } from 'antd';
const Infor = ({ showtime, selectedSeats }) => {
  if (!showtime) {
    return <p>Loading...</p>;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex pb-11 pl-40 pr-40 mb-12 bg-gray-50">
        <div className="w-2/3 mr-10">
          <div className="mt-10">
            <Link to="/">
              <span className="text-blue-600 font-semibold mr-2 text-xl">
                Trang chủ
              </span>
            </Link>
            <span className="">
              <RightOutlined />
            </span>
            <Link to="/bookticket/showtimeId">
              <span className="text-blue-600 font-semibold mr-2 ml-2 text-xl">
                Đặt vé
              </span>
            </Link>
            <span className="">
              <RightOutlined />
            </span>
            <span className="text-blue-600 font-semibold ml-2 text-xl">
              {showtime.movie.name}
            </span>
          </div>

          <div className="mt-10">
            <div className="flex items-center">
                <span className="border rounded-full pt-2 pb-2 pr-3 pl-3 border-2 border-gray-400 mr-4"><UserOutlined /></span>
                <span className="text-xl font-base">THÔNG TIN THANH TOÁN</span>
            </div>
            <div className="flex mt-10">
                <div className="flex flex-col w-1/3">
                    <div className="mb-2">
                        Họ tên:
                    </div>
                    <div className="font-light">
                        User's Name
                    </div>
                </div>
                <div className="flex flex-col w-1/3">
                    <div className="mb-2">
                        Số điện thoại:
                    </div>
                    <div className="font-light">
                        User's Phone
                    </div>
                </div>
                <div className="flex flex-col w-1/3">
                    <div className="mb-2">
                        Email:
                    </div>
                    <div className="font-light">
                        User's Email
                    </div>
                </div>
            </div>

            <div className="flex mt-12 justify-between border-b-2 pb-3 ">
                <span>GHẾ THƯỜNG</span>
                <span>
                    <span>{selectedSeats.length} x {showtime.price.toLocaleString('vi-VN')} = {(selectedSeats.length * showtime.price).toLocaleString('vi-VN')} VND </span>
                </span>
            </div>
          </div>

          <div className="mt-20">
          <div className="flex items-center">
                <span className="border rounded-full pt-2 pb-2 pr-3 pl-3 border-2 border-gray-400 mr-4"><CreditCardOutlined /></span>
                <span className="text-xl font-base">PHƯƠNG THỨC THANH TOÁN</span>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <div
            className={`ticket pb-9 bg-white ${isScrolled ? 'scrolled' : ''}`}
          >
            <div className="flex gap-4 mb-5">
              <div className="relative w-1/2">
                <img
                  className="relative"
                  src={showtime.movie.image}
                  alt={showtime.movie.name}
                />
                <img
                  className="absolute top-2 left-2"
                  src={showtime.movie.iconFilm}
                  alt=""
                />
              </div>
              <div className="text-xl font-semibold w-1/2 pt-3">
                {showtime.movie.name}
              </div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <TagsOutlined /> Thể loại:
                </span>
              </div>
              <div className="w-1/2 text-base">
                {showtime.movie.categories.join(',')}
              </div>
            </div>

            <div className="flex items-center pb-5 mb-5 border-b-2 border-dashed border-black ">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <ClockCircleOutlined /> Thời lượng:
                </span>
              </div>
              <div className="w-1/2 text-base">
                {showtime.movie.duration} phút
              </div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <HomeOutlined /> Rạp chiếu:
                </span>
              </div>
              <div className="w-1/2 text-base">{showtime.cinema.name}</div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <CalendarOutlined /> Ngày chiếu:
                </span>
              </div>
              <div className="w-1/2 text-base">
                {new Date(showtime.startTime).toLocaleDateString()}
              </div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <ClockCircleOutlined /> Giờ chiếu:
                </span>
              </div>
              <div className="w-1/2 text-base">
                {new Date(showtime.startTime).toLocaleTimeString()}
              </div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <FundProjectionScreenOutlined /> Phòng chiếu:
                </span>
              </div>
              <div className="w-1/2 text-base">{showtime.theater.name}</div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <GoldOutlined /> Ghế ngồi:
                </span>
              </div>
              <div className="w-1/2 text-base">
                {selectedSeats.map((seat) => seat.seat_number).join(', ')}
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <Button className="bg-blue-500 text-white font-semibold flex items-center justify-center p-4 hover:bg-white">
                QUAY LẠI
              </Button>
              <Button className="bg-blue-500 text-white font-semibold flex items-center justify-center p-4 hover:bg-white">
                TIẾP TỤC
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Infor;
