import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import {
  useFetchMovieQuery,
  useUpdateMovieMutation,
} from '../../../../app/api/movieService';
import { useForm } from 'antd/es/form/Form';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetCategoryListQuery } from '../../../../app/api/categoryService';
import defaultImage from '../../../../assets/images/default-movie-img.jpg';

function Edit() {
  const { id } = useParams();
  const { data, isLoading } = useFetchMovieQuery(id);
  const { data: category } = useGetCategoryListQuery();
  const [updateMovie] = useUpdateMovieMutation();
  const [form] = useForm();
  const [imageUrl, setImageUrl] = useState(data?.image);
  const navigate = useNavigate();

  const onFinish = () => {
    const updatedData = form.getFieldValue();

    updateMovie({
      ...updatedData,
      openDate: updatedData.openDate.format('DD/MM/YYYY'),
    }).then(() => navigate(-1));
  };

  useEffect(() => {
    setImageUrl(data?.image);
  }, [data]);

  return (
    <AdminLayout>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <div className="w-full grid grid-cols-12 gap-2">
          <Form
            form={form}
            initialValues={{
              ...data,
              openDate: dayjs(data?.openDate, 'DD/MM/YYYY'),
            }}
            layout="vertical"
            autoComplete="off"
            className="col-span-8"
            onFinish={onFinish}
          >
            <Form.Item
              label="Tiêu đề"
              name={'name'}
              rules={[
                { required: true, message: 'Tiêu đề không được để trống' },
              ]}
            >
              <Input placeholder="Tiêu đề" />
            </Form.Item>
            <div className="md:flex flex-row gap-3">
              <Form.Item
                label="Thời lượng"
                name={'duration'}
                rules={[
                  {
                    required: true,
                    message: 'Thời lượng phim không được để trống',
                  },
                ]}
                className="grow"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Đạo diễn"
                name="director"
                rules={[
                  { required: true, message: 'Đạo diễn không được để trống' },
                ]}
                className="grow"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Ngày khởi chiếu"
                name="openDate"
                rules={[
                  {
                    required: true,
                    message: 'Ngày khởi chiếu không được trống',
                  },
                ]}
                className="grow"
              >
                <DatePicker
                  placeholder="Ngày khởi chiếu"
                  className="w-full"
                  format={'DD/MM/YYYY'}
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Thể loại"
              name={'categories'}
              rules={[
                { required: true, message: 'Phải có ít nhất 1 thể loại' },
              ]}
              className="grow"
            >
              <Select
                mode="multiple"
                options={category?.map((item) => ({
                  label: item.name,
                  value: item.name,
                }))}
              />
            </Form.Item>
            <Form.Item label="Mô tả" name={'description'}>
              <Input.TextArea placeholder="Mô tả" autoSize={true} />
            </Form.Item>
            <Form.Item label="Ảnh" name="image">
              <Input
                placeholder="Ảnh nền"
                onBlur={(e) => setImageUrl(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Link trailer" name="linkPreview">
              <Input placeholder="Link preview" />
            </Form.Item>
          </Form>
          <div className="col-span-4 flex flex-row justify-center items-start">
            <img
              src={imageUrl}
              alt="movie-image"
              onError={(event) => {
                event.target.src = defaultImage;
                event.onerror = null;
              }}
              className="object-contain"
            />
          </div>
          <div className="col-span-full">
            <Button onClick={() => form.submit()} type="primary" ghost>
              Cập nhật
            </Button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Edit;
