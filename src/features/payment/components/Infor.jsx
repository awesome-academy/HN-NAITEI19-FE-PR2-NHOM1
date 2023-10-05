import React, { useState, useEffect } from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  GoldOutlined,
  HomeOutlined,
  TagsOutlined,
  FundProjectionScreenOutlined,
  RightOutlined,
  UserOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, Radio, message } from 'antd';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';

import { useCreateTicketMutation } from '../../../app/api/ticketService';
import '../../ticket/components/Ticket.css';

const Infor = ({ showtime, selectedSeats, movie }) => {
  const { cinema } = useSelector((state) => state.CinemaSlice);
  const user = JSON.parse(localStorage.getItem('user'));
  const [form] = useForm();
  const navigate = useNavigate();
  const [createTicket] = useCreateTicketMutation();

  if (!showtime) {
    return <p>Loading...</p>;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(1);

  const [messageApi, contextHolder] = message.useMessage();

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

  const createBooking = () => {
    const data = {
      showtimeId: showtime.id,
      seat: [...selectedSeats.map((item) => item.id)],
      userId: user.id,
      status: paymentMethod,
      type: paymentMethod,
      movieId: movie.id,
      total: selectedSeats.length * showtime.price,
    };
    createTicket(data)
      .then(() => {
        navigate('success');
      })
      .catch((error) => {
        console.log('Có lỗi xảy ra', error);
        messageApi.open({
          type: 'error',
          content: 'Có lỗi xảy ra vui lòng thử lại sau',
        });
      });
  };

  const onFinish = () => {
    createBooking();
  };

  return (
    <>
      {contextHolder}
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
              {movie.name}
            </span>
          </div>

          <div className="mt-10">
            <div className="flex items-center">
              <span className="rounded-full pt-2 pb-2 pr-3 pl-3 border-2 border-gray-400 mr-4">
                <UserOutlined />
              </span>
              <span className="text-xl font-base">THÔNG TIN THANH TOÁN</span>
            </div>
            <div className="flex mt-10">
              <div className="flex flex-col w-1/3">
                <div className="mb-2">Họ tên:</div>
                <div className="font-light">{user.username}</div>
              </div>
              <div className="flex flex-col w-1/3">
                <div className="mb-2">Số điện thoại:</div>
                <div className="font-light">{user.phoneNumber}</div>
              </div>
              <div className="flex flex-col w-1/3">
                <div className="mb-2">Email:</div>
                <div className="font-light">{user.email}</div>
              </div>
            </div>

            <div className="flex mt-12 justify-between border-b-2 pb-3 ">
              <span>GHẾ THƯỜNG</span>
              <span>
                <span>
                  {selectedSeats.length} x{' '}
                  {showtime.price.toLocaleString('vi-VN')} ={' '}
                  {(selectedSeats.length * showtime.price).toLocaleString(
                    'vi-VN'
                  )}{' '}
                  VND{' '}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center">
              <span className="rounded-full pt-2 pb-2 pr-3 pl-3 border-2 border-gray-400 mr-4">
                <CreditCardOutlined />
              </span>
              <span className="text-xl font-base">PHƯƠNG THỨC THANH TOÁN</span>
            </div>
            <div className="mt-5">
              <Radio.Group
                value={paymentMethod}
                onChange={(event) => {
                  setPaymentMethod(event.target.value);
                }}
              >
                <Radio value={1}>Thanh toán qua thẻ</Radio>
                <Radio value={0}>Thanh toán tại quầy</Radio>
              </Radio.Group>
            </div>
            {paymentMethod === 1 && (
              <Form
                form={form}
                autoComplete="off"
                layout="vertical"
                className="mt-5"
                onFinish={onFinish}
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Số thẻ không được để trống',
                    },
                  ]}
                  label={'Số thẻ'}
                  name={'cardNumber'}
                >
                  <Input placeholder="1234 1234 1234 1234" />
                </Form.Item>
                <div className="flex justify-between gap-3">
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Ngày phát hành không được để trống',
                      },
                    ]}
                    label="Ngày phát hành"
                    name={'date'}
                    className="basis-0 grow"
                  >
                    <DatePicker
                      className="w-full"
                      disabledDate={(current) =>
                        current && current.valueOf() > Date.now()
                      }
                      format={'DD/MM/YYYY'}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Tên chủ thẻ không được để trống',
                      },
                    ]}
                    label="Tên chủ thẻ"
                    name={'cardOwner'}
                    className="basis-0 grow"
                  >
                    <Input placeholder="Nguyen Van A" />
                  </Form.Item>
                </div>
              </Form>
            )}
          </div>
        </div>

        <div className="w-1/3">
          <div
            className={`ticket pb-9 bg-white ${isScrolled ? 'scrolled' : ''}`}
          >
            <div className="flex gap-4 mb-5">
              <div className="relative w-1/2">
                <img className="relative" src={movie.image} alt={movie.name} />
                <img
                  className="absolute top-2 left-2"
                  src={movie.iconFilm}
                  alt=""
                />
              </div>
              <div className="text-xl font-semibold w-1/2 pt-3">
                {movie.name}
              </div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <TagsOutlined /> Thể loại:
                </span>
              </div>
              <div className="w-1/2 text-base">
                {movie.categories.join(',')}
              </div>
            </div>

            <div className="flex items-center pb-5 mb-5 border-b-2 border-dashed border-black ">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <ClockCircleOutlined /> Thời lượng:
                </span>
              </div>
              <div className="w-1/2 text-base">{movie.duration} phút</div>
            </div>

            <div className="flex mb-3 items-center">
              <div className="w-1/2">
                <span className="text-base font-light pl-6">
                  <HomeOutlined /> Rạp chiếu:
                </span>
              </div>
              <div className="w-1/2 text-base">{cinema}</div>
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
              <Button
                className="bg-blue-500 text-white font-semibold flex items-center justify-center p-4 hover:bg-white"
                onClick={() => {
                  navigate(-1);
                }}
              >
                QUAY LẠI
              </Button>
              <Button
                className="bg-blue-500 text-white font-semibold flex items-center justify-center p-4 hover:bg-white"
                onClick={() => {
                  if (paymentMethod === 1) form.submit();
                  else createBooking();
                }}
              >
                ĐẶT CHỖ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Infor;
