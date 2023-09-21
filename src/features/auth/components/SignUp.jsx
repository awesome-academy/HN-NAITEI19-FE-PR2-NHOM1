import { DatePicker, Form, Input, Select, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LockFilled, UserOutlined, PhoneFilled } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useSignUpMutation } from '../authService';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form] = useForm();
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmit = () => {
    const data = form.getFieldValue();
    delete data.confirmPassword;

    signUp({ ...data, dob: data.dob.format('DD/MM/YYYY') })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      })
      .catch((error) => {
        console.log('Lỗi r bé ơi', error);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) navigate('/');
  }, []);

  return (
    <div className="p-4 w-full md:max-w-[500px] bg-white">
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        className="md:grid gap-x-4 grid-cols-2"
        onFinish={() => onSubmit()}
      >
        <Form.Item
          label="Họ tên"
          name="username"
          rules={[
            {
              required: true,
              message: 'Họ tên không được để trống',
            },
          ]}
        >
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Email không được để trống',
            },
            {
              type: 'email',
              message: 'Email không đúng định dạng',
            },
          ]}
        >
          <Input placeholder="Email" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Mật khẩu không được để trống' },
            {
              type: 'string',
              min: 6,
              message: 'Mật khẩu cần có ít nhất 6 ký tự',
            },
          ]}
          label="Mật khẩu"
          hasFeedback
        >
          <Input.Password
            placeholder="Mật khẩu"
            type="password"
            prefix={<LockFilled />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Mật khẩu không khớp' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
          label="Xác nhận lại mật khẩu"
          hasFeedback
          dependencies={['password']}
        >
          <Input.Password
            placeholder="Mật khẩu"
            type="password"
            prefix={<LockFilled />}
          />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Ngày sinh"
          rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}
        >
          <DatePicker
            placeholder="Ngày sinh"
            className="w-full"
            disabledDate={(current) =>
              current && current.valueOf() > Date.now()
            }
            format={'DD/MM/YYYY'}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: 'Giới tính không được để trống' }]}
        >
          <Select
            placeholder="Giới tính"
            options={[
              {
                label: 'Nam',
                value: 1,
              },
              {
                label: 'Nữ',
                value: 2,
              },
              {
                label: 'Khác',
                value: 3,
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Số điện thoại không được để trống' },
          ]}
          name="phoneNumber"
        >
          <Input placeholder="Số điện thoại" prefix={<PhoneFilled />} />
        </Form.Item>
      </Form>

      <div className="flex justify-center">
        <button
          className="py-3 bg-red-500 text-white hover:bg-red-400 hover:text-black duration-200 w-1/2 rounded-lg"
          onClick={() => form.submit()}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}

export default Signup;
