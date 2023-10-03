import React, { useState } from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import { Button, Modal, Space, Table, Tag } from 'antd';
import {
  useDeleteMovieMutation,
  useGetMoviesQuery,
} from '../../../../app/api/movieService';
import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {
  LoadingOutlined,
  DeleteOutlined,
  WarningOutlined,
  PlusOutlined,
} from '@ant-design/icons';

function Movies() {
  const { data, isLoading } = useGetMoviesQuery();
  const { searchString } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const [deleteMovie] = useDeleteMovieMutation();

  const column = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (img) => <img className="w-[40px] h-auto" src={img} />,
    },
    {
      title: 'Tên phim',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => <Link to={`${item.id}`}>{item.name}</Link>,
    },
    {
      title: 'Đạo diễn',
      dataIndex: 'director',
      key: 'director',
      responsive: ['md'],
    },
    {
      title: 'Thể loại',
      dataIndex: 'categories',
      key: 'categories',
      render: (category) => {
        return (
          <>
            {category.map((item, index) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </>
        );
      },
      responsive: ['md'],
    },
    {
      title: 'Ngôn ngữ',
      dataIndex: 'language',
      key: 'language',
      responsive: ['md'],
    },
    {
      title: '',
      render: (item) => (
        <Space>
          <button onClick={() => navigate(`/admin/movies/edit/${item.id}`)}>
            <EditOutlined className={`cursor-pointer text-blue-500`} />
          </button>
          <button
            onClick={() =>
              Modal.confirm({
                title: 'Bạn có thực sự muốn xóa',
                icon: <WarningOutlined />,
                okText: 'Xác nhận',
                okType: 'danger',
                cancelText: 'Hủy',
                centered: true,
                onOk: () => {
                  deleteMovie(item.id);
                },
                onCancel: () => {},
              })
            }
          >
            <DeleteOutlined className={`cursor-pointer text-red-500`} />
          </button>
        </Space>
      ),
      fixed: 'right',
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Danh sách phim</h1>
        <Button
          ghost
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('create')}
        >
          Tạo phim mới
        </Button>
      </div>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <Table
          rowKey={(item) => item.id}
          dataSource={data.filter((item) =>
            item.name?.toLowerCase().includes(searchString.toLowerCase())
          )}
          columns={column}
          pagination={{ pageSize: 7 }}
        />
      )}
    </AdminLayout>
  );
}

export default Movies;
