import { DatePicker, Form, Input, Select, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UserOutlined, PhoneFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useUpdateUserMutation } from '../../../app/api/userService';

function InfoForm({ isModalOpen, setModalContent, user }) {
  const [form] = useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    setConfirmLoading(true);
    onSubmit();
    setConfirmLoading(false);
    hideModal();
  };

  const hideModal = () => {
    setModalContent(
      <InfoForm
        isModalOpen={false}
        setModalContent={setModalContent}
      ></InfoForm>
    );
  };
  const onSubmit = () => {
    const formData = form.getFieldValue();
    try {
      updateUser({
        ...formData,
        dob: formData.dob.format('DD/MM/YYYY'),
        id: user.id,
        password: user.password,
      });
      messageApi.open({
        type: 'success',
        content: 'Update thành công!',
      });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Update thất bại!',
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={hideModal}
        confirmLoading={confirmLoading}
      >
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
            initialValue={user?.username}
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
            initialValue={user?.email}
          >
            <Input placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Ngày sinh"
            rules={[
              { required: true, message: 'Ngày sinh không được để trống' },
            ]}
            initialValue={dayjs(user?.dob, 'DD/MM/YYYY')}
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
            rules={[
              { required: true, message: 'Giới tính không được để trống' },
            ]}
            initialValue={user?.gender}
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
              {
                required: true,
                message: 'Số điện thoại không được để trống',
              },
            ]}
            name="phoneNumber"
            initialValue={user?.phoneNumber}
          >
            <Input placeholder="Số điện thoại" prefix={<PhoneFilled />} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default InfoForm;
