import { Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LockFilled } from '@ant-design/icons';
import { useState } from 'react';

import { useUpdateUserMutation } from '../../../features/admin/components/userTable/userService';

function ChangePassForm({ isModalOpen, setModalContent, user }) {
  const [form] = useForm();
  const [updateUser] = useUpdateUserMutation();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    setConfirmLoading(true);
    onSubmit();
    setConfirmLoading(false);
    hideModal();
  };

  const hideModal = () => {
    setModalContent(
      <ChangePassForm
        isModalOpen={false}
        setModalContent={setModalContent}
      ></ChangePassForm>
    );
  };
  const onSubmit = () => {
    const data = form.getFieldValue();
    delete data.confirmPassword;
    form.resetFields();
    try {
      updateUser({
        id: user.id,
        username: user.username,
        email: user.email,
        password: data.password,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        dob: user.dob,
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
            name="password"
            rules={[
              { required: true, message: 'Mật khẩu không được để trống' },
              {
                type: 'string',
                min: 6,
                message: 'Mật khẩu cần có ít nhất 6 ký tự',
              },
            ]}
            label="Mật khẩu mới"
            hasFeedback
          >
            <Input.Password
              placeholder="Mật khẩu mới"
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
            label="Xác nhận lại mật khẩu mới"
            hasFeedback
            dependencies={['password']}
          >
            <Input.Password
              placeholder="Mật khẩu"
              type="password"
              prefix={<LockFilled />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ChangePassForm;
