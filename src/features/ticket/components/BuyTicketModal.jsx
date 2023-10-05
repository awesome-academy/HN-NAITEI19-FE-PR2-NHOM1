import React, { useState } from 'react';
import { Modal, Tabs, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowtime } from '../../../app/store/bookingSlice';

const { TabPane } = Tabs;

const BuyTicketModal = ({ movie, visible, onClose, showtimes }) => {
  const dispatch = useDispatch();
  const filterShowtimes = showtimes
    ? showtimes.filter((showtime) => showtime.movieId === movie.id)
    : [];

  const groupedShowtimes = {};

  filterShowtimes.forEach((showtime) => {
    const startTime = new Date(showtime.startTime);
    const showtimeDate = startTime.toLocaleDateString();
    if (!groupedShowtimes[showtimeDate]) {
      groupedShowtimes[showtimeDate] = [];
    }

    groupedShowtimes[showtimeDate].push(showtime);
  });

  const { showtime: selectedShowTime } = useSelector((state) => state.booking);
  const { cinema } = useSelector((state) => state.CinemaSlice);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectedClick = (showtime) => {
    dispatch(setShowtime(showtime));
    setModalVisible(true);
  };

  const handleCloseConfirmation = () => {
    dispatch(setShowtime(null));
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'Rạp chiếu',
      dataIndex: 'theaterName',
      key: 'theaterName',
    },
    {
      title: 'Ngày chiếu',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Giờ chiếu',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  const tableData = [];
  if (selectedShowTime) {
    tableData.push({
      key: '1',
      theaterName: 'Beta Thái Nguyên',
      date: new Date(selectedShowTime.startTime).toLocaleDateString(),
      time: new Date(selectedShowTime.startTime).toLocaleTimeString(),
    });
  }

  return (
    <>
      <Modal
        title={
          movie && (
            <div className="text-2xl font-semibold mt-2">
              LỊCH CHIẾU - {movie.name}
            </div>
          )
        }
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
        destroyOnClose
        width={900}
      >
        <div className="text-3xl font-bold flex justify-center mt-5 mb-4 pt-5 pb-4 border-t border-b border-gray-300">
          {cinema}
        </div>
        <Tabs
          className="mb-10"
          defaultActiveKey={Object.keys(groupedShowtimes)[0]}
        >
          {Object.keys(groupedShowtimes).map((date) => (
            <TabPane tab={date} key={date}>
              <ul className="flex gap-6">
                {groupedShowtimes[date].map((showtime) => (
                  <li key={showtime.id}>
                    <Button
                      onClick={() => handleSelectedClick(showtime)}
                      className="bg-blue-500 text-white hover:bg-white"
                    >
                      {new Date(showtime.startTime).toLocaleTimeString()}
                    </Button>
                  </li>
                ))}
              </ul>
            </TabPane>
          ))}
        </Tabs>
      </Modal>
      <Modal
        title={
          <p className="text-xl font-semibold">BẠN ĐANG ĐẶT VÉ XEM PHIM</p>
        }
        open={modalVisible}
        onCancel={handleCloseConfirmation}
        centered
        width={700}
        footer={
          <div className="flex justify-center items-center mt-4">
            {selectedShowTime && (
              <Link to={`/bookticket/${selectedShowTime.id}`}>
                <Button className="text-white font-semibold text-lg bg-blue-500 pt-5 pb-5 pl-8 pr-8 flex justify-center items-center hover:bg-white">
                  ĐỒNG Ý
                </Button>
              </Link>
            )}
          </div>
        }
      >
        {movie && (
          <div className="text-3xl font-semibold text-blue-700 flex justify-center mt-3 mb-6 pt-5 pb-3 border-t border-b border-gray-200">
            {movie.name}
          </div>
        )}
        <div className="pb-8 border-b border-gray-100">
          {selectedShowTime && (
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default BuyTicketModal;
