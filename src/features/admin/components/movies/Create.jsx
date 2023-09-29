import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import { useCreateMovieMutation } from '../../../../app/api/movieService';
import { useForm } from 'antd/es/form/Form';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useGetCategoryListQuery } from '../../../../app/api/categoryService';
import defaultImage from '../../../../assets/images/default-movie-img.jpg';

function Create() {
  const [form] = useForm();
  const [imageUrl, setImageUrl] = useState('');
  const { data: categories } = useGetCategoryListQuery();
  const navigate = useNavigate();
  const [createMovies] = useCreateMovieMutation();

  const onFinish = () => {
    const data = form.getFieldValue();

    createMovies(data).then(() => {
      navigate('/admin');
    });
  };

  return (
    <AdminLayout>
      <div className="font-bold text-2xl mb-4">Tạo phim mới</div>
      <div className="w-full grid grid-cols-12 gap-2">
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          className="col-span-8"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tiêu đề"
            name={'name'}
            rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
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
            rules={[{ required: true, message: 'Phải có ít nhất 1 thể loại' }]}
            className="grow"
          >
            <Select
              mode="multiple"
              options={categories?.map((item) => ({
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
            Thêm mới
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Create;
