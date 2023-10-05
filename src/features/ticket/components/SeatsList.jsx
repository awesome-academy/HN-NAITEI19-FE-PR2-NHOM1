import React, { useState, useEffect, useRef } from 'react';
import { useGetSeatsByTheaterIdQuery } from '../../../app/api/seatService';
import seatEmpty from '../../../assets/images/theater/seat-empty.png';
import seatProcess from '../../../assets/images/theater/seat-process.png';
import seatBuy from '../../../assets/images/theater/seat-buy.png';
import seatSelect from '../../../assets/images/theater/seat-select.png';
import seatSet from '../../../assets/images/theater/seat-set.png';
import screen from '../../../assets/images/theater/screen.png';
import seatVip from '../../../assets/images/theater/seat-vip.png';
import seatDouble from '../../../assets/images/theater/seat-double.png';
import { Link, useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import Ticket from './Ticket';
import { Statistic } from 'antd';
import dayjs from 'dayjs';

const SeatsList = ({ showtime, bookedSeats }) => {
  const { data: seats, isLoading } = useGetSeatsByTheaterIdQuery(
    showtime.theaterId
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const deadline = useRef(dayjs().add(10, 'minute'));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat.id)) {
      const isSelected = selectedSeats.some(
        (selectedSeat) => selectedSeat.id === seat.id
      );

      if (isSelected) {
        setSelectedSeats(
          selectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id)
        );
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

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
          <div className="mt-10 flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <img
                src={seatEmpty}
                alt="seat empty"
                style={{ height: '35px', width: '35px' }}
              />
              <span>Ghế trống</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={seatSelect}
                alt="seat select"
                style={{ height: '35px', width: '35px' }}
              />
              <span>Ghế đang chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={seatProcess}
                alt="seat process"
                style={{ height: '35px', width: '35px' }}
              />
              <span>Ghế đang được giữ</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={seatBuy}
                alt="seat buy"
                style={{ height: '35px', width: '35px' }}
              />
              <span>Ghế đã bán</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={seatSet}
                alt="seat set"
                style={{ height: '35px', width: '35px' }}
              />
              <span>Ghế đặt trước</span>
            </div>
          </div>
          <div className="mt-9">
            <img src={screen} alt="Screen" className="w-full" />
          </div>
          <div className="p-10 grid grid-cols-10 gap-2">
            {seats.map((seat) => (
              <div
                key={seat.id}
                className="relative cursor-pointer"
                onClick={() => handleSeatClick(seat)}
              >
                {bookedSeats.includes(seat.id) ? (
                  <img
                    src={seatBuy}
                    alt="Seat"
                    style={{ height: '35px', width: '35px' }}
                    onClick={(e) => e.preventDefault()}
                  />
                ) : (
                  <img
                    src={
                      selectedSeats.some(
                        (selectedSeat) => selectedSeat.id === seat.id
                      )
                        ? seatSelect
                        : seatEmpty
                    }
                    alt="Seat"
                    style={{ height: '35px', width: '35px' }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    top: '7px',
                    left: '11px',
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  {seat.seat_number}
                </div>
              </div>
            ))}
          </div>

          <div className="flex bg-white p-5 mt-10">
            <div className="flex flex-col items-center w-1/2">
              <div className="flex gap-4 items-center mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src={seatEmpty}
                    alt="seat empty"
                    style={{ height: '35px', width: '35px' }}
                  />
                  <span>Ghế thường</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={seatVip}
                    alt="seat empty"
                    style={{ height: '35px', width: '35px' }}
                  />
                  <span>Ghế VIP</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={seatDouble}
                    alt="seat empty"
                    style={{ height: '20px', width: '40px' }}
                  />
                  <span>Ghế </span>
                </div>
              </div>
              <div className="quantity">
                <span className="mr-2 text-xl text-blue-600">
                  {selectedSeats.length}
                </span>
                <span className="text-xl text-blue-600">
                  x {showtime.price.toLocaleString('vi-VN')} VND
                </span>
              </div>
            </div>

            <div className="border-l-2 border-r-2 border-gray-300 border-solid w-1/4 flex flex-col items-center">
              <div className="mb-8">Tổng tiền:</div>
              <div className="text-xl text-blue-600">
                {(selectedSeats.length * showtime.price).toLocaleString(
                  'vi-VN'
                )}{' '}
                VND
              </div>
            </div>

            <div className="flex flex-col items-center w-1/4">
              <div className="mb-8">Thời gian còn lại:</div>
              <Statistic.Countdown
                value={deadline.current}
                onFinish={() => navigate('/')}
              />
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <Ticket showtime={showtime} selectedSeats={selectedSeats} />
        </div>
      </div>
    </>
  );
};

export default SeatsList;
