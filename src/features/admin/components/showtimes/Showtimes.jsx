import React, { useState } from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import {
  useAddShowtimeMutation,
  useDeleteShowtimeMutation,
  useGetShowtimesQuery,
  useUpdateShowtimeMutation,
} from '../../../../app/api/showtimeService';
import {
  LoadingOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import dayjs from 'dayjs';
import { useGetMoviesQuery } from '../../../../app/api/movieService';
import { useForm } from 'antd/es/form/Form';
import { useGetAllCinemasQuery } from '../../../../app/api/cinemaService';

function Showtimes() {
  const { data, isLoading } = useGetShowtimesQuery();
  const { data: movies } = useGetMoviesQuery();
  const { data: cinemas } = useGetAllCinemasQuery();

  const [createShowtime] = useAddShowtimeMutation();
  const [deleteShowtime] = useDeleteShowtimeMutation();
  const [updateShowtime] = useUpdateShowtimeMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = useForm();

  if (isLoading) {
    return (
      <AdminLayout>
        <LoadingOutlined />
      </AdminLayout>
    );
  }

  const columns = [
    {
      title: 'Tên phim',
      key: 'movieName',
      render: (item) => item.movie.name,
    },
    {
      title: 'Thời gian bắt đầu',
      key: 'startTime',
      dataIndex: 'startTime',
      render: (item) => dayjs(item).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Phòng chiếu',
      key: 'theater',
      render: (item) => item.theater.name,
    },
    {
      title: 'Rạp chiếu',
      key: 'cinema',
      render: (item) => item.cinema.name,
    },
    {
      title: 'Giá vé',
      key: 'price',
      dataIndex: 'price',
      render: (text) =>
        text.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        }),
      defaultSortOrder: 'descend',
      sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (item) =>
        dayjs(item.startTime).add(item.movie.duration, 'minute') > dayjs() ? (
          <Tag color="green">Sắp chiếu</Tag>
        ) : (
          <Tag color="volcano">Đã qua</Tag>
        ),
    },
    {
      title: '',
      key: 'actions',
      render: (item) => (
        <Space>
          {dayjs(item.startTime).add(item.movie.duration, 'minute') >
          dayjs() ? (
            <button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedCinema(item.cinemaId);
                setIsEdit(true);
                form.setFieldsValue({
                  ...item,
                  startTime: dayjs(item.startTime),
                });
              }}
            >
              <EditOutlined className={`cursor-pointer text-blue-500`} />
            </button>
          ) : (
            <></>
          )}
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
                  deleteShowtime(item.id);
                },
                onCancel: () => {},
              })
            }
          >
            <DeleteOutlined className={`cursor-pointer text-red-500`} />
          </button>
        </Space>
      ),
    },
  ];

  const onFinish = () => {
    const formData = form.getFieldValue();
    const data = {
      ...formData,
      startTime: formData.startTime.toDate().toString(),
      price: parseInt(formData.price),
    };

    if (isEdit) {
      delete data.movie;
      delete data.theater;
      delete data.cinema;

      updateShowtime(data)
        .then(() => {
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.log('Lỗi r bé ơi ><!', error);
        });
    } else {
      createShowtime(data)
        .then(() => {
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.log('Lỗi r bé ơi ><!', error);
        });
    }
  };

  return (
    <AdminLayout>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
          setSelectedCinema(0);
          setIsEdit(false);
          form.resetFields();
        }}
        ghost
        icon={<PlusOutlined />}
        className="float-right mb-4"
      >
        Thêm suất chiếu
      </Button>
      <Table rowKey={(item) => item.id} dataSource={data} columns={columns} />
      <Modal
        title="Thêm suất chiếu"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Phim"
            name="movieId"
            rules={[{ required: true, message: 'Phim không được để trống' }]}
          >
            <Select
              options={movies?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Rạp"
            name="cinemaId"
            rules={[{ required: true, message: 'Rạp không được để trống' }]}
          >
            <Select
              options={cinemas?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              onSelect={(value) => {
                setSelectedCinema(value);
                form.resetFields(['theaterId']);
              }}
            />
          </Form.Item>

          {selectedCinema ? (
            <Form.Item
              label="Phòng chiếu"
              name="theaterId"
              rules={[
                { required: true, message: 'Phòng trống không được thiếu' },
              ]}
            >
              <Select
                options={cinemas
                  ?.find((item) => item.id === form.getFieldValue().cinemaId)
                  ?.theaters.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
              />
            </Form.Item>
          ) : (
            <></>
          )}

          <div className="flex flex-row gap-4">
            <Form.Item
              label="Giá vé"
              name="price"
              rules={[
                { required: true, message: 'Giá vé không được để trống' },
              ]}
              className="grow basis-0"
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Giờ chiếu"
              name={'startTime'}
              rules={[{ required: true, message: 'Vui lòng nhập giờ chiếu' }]}
              className="basis-0 grow"
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </AdminLayout>
  );
}

export default Showtimes;
