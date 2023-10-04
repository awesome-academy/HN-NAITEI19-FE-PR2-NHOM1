import React, { useState, useEffect } from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  GoldOutlined,
  HomeOutlined,
  TagsOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import './Ticket.css';
import { useDispatch } from 'react-redux';
import { setSeats } from '../../../app/store/bookingSlice';
import { useNavigate } from 'react-router-dom';
const Ticket = ({ showtime, selectedSeats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleContinue = () => {
    dispatch(setSeats(selectedSeats));
    navigate('/payment');
  };

  return (
    <div className={`ticket pb-9 bg-white ${isScrolled ? 'scrolled' : ''}`}>
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
        <div className="w-1/2 text-base">{showtime.movie.duration} phút</div>
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

      <div className="flex justify-center mt-6">
        <Button
          className="bg-blue-500 text-white font-semibold flex items-center justify-center p-4 hover:bg-white"
          onClick={handleContinue}
        >
          TIẾP TỤC
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
