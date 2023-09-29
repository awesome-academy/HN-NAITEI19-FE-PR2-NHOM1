import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import Input from 'antd/es/input/Input';
import React, { useEffect } from 'react';
import { useLoginMutation } from '../../../app/api/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form] = useForm();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = () => {
    const { email, password } = form.getFieldValue();
    login({ email, password })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (res.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log('Call api login error >_<', error);
        form.setFields([
          {
            name: 'email',
            errors: ['Email hoặc mật khẩu không đúng'],
          },
        ]);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) navigate('/');
  }, []);

  return (
    <div className="p-4 md:min-w-[500px] bg-white">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={() => onFinish()}
        className="mb-5"
      >
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
          rules={[{ required: true, message: 'Password không được để trống' }]}
          label="Mật khẩu"
        >
          <Input
            placeholder="Mật khẩu"
            type="password"
            prefix={<LockFilled />}
          />
        </Form.Item>
      </Form>
      <div className="flex justify-center">
        <button
          className="py-3 bg-red-500 text-white hover:bg-red-400 hover:text-black duration-200 w-1/2 rounded-lg"
          onClick={() => form.submit()}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Login;
