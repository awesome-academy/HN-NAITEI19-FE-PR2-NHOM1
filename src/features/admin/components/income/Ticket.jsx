import React from 'react';
import { useGetTicketsQuery } from '../../../../app/api/ticketService';

import { LoadingOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';

function Ticket({ className }) {
  const { data, isLoading } = useGetTicketsQuery();

  if (isLoading) return <LoadingOutlined />;

  const colums = [
    {
      title: 'Tên người dùng',
      key: 'username',
      render: (item) => item.user.username,
    },
    {
      title: 'Tên phim',
      key: 'movie',
      render: (item) => item.movie.name,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (item) =>
        item.status === 1 ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : item.status === 0 &&
          dayjs(item.showtime.startTime).add(item.movie.duration, 'minute') >
            dayjs() ? (
          <Tag color="orange">Đợi thanh toán</Tag>
        ) : (
          <Tag color="volcano">Hết hạn</Tag>
        ),
    },
    {
      title: 'Thời gian bắt đầu',
      key: 'startTime',
      render: (item) =>
        dayjs(item.showtime.startTime).format('DD/MM/YYYY hh:mm'),
    },
    {
      title: 'Giá tiền',
      key: 'total',
      dataIndex: 'total',
      render: (total) =>
        total.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        }),
    },
  ];

  return (
    <div className={className}>
      <h1 className="text-2xl font-bold mb-5">Danh sách vé đã đặt</h1>
      <Table
        columns={colums}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default Ticket;
