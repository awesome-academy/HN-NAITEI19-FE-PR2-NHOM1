import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  DatePicker,
  Popconfirm,
  Table,
  Typography,
  Skeleton,
  Select,
  message,
} from 'antd';

import {
  useGetUSersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './userService';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  const inputNode = (dataIndex === 'gender' && (
    <Select
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
  )) ||
    (dataIndex === 'birth' && (
      <DatePicker
        className='w-full'
        disabledDate={(current) => current && current.valueOf() > Date.now()}
        format={'DD/MM/YYYY'}
      />
    )) || <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function UserTable() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: uerList, isLoading } = useGetUSersQuery();
  const [data, setData] = useState([]);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUserApi] = useDeleteUserMutation();
  const [editingKey, setEditingKey] = useState('');

  const usernameSearchList = uerList?.map((user) => ({
    text: user.username,
    value: user.username,
  }));

  const emailSearchList = uerList?.map((user) => ({
    text: user.email,
    value: user.email,
  }));

  const phoneSearchList = uerList?.map((user) => ({
    text: user.phoneNumber,
    value: user.phoneNumber,
  }));
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      username: record.username,
      email: record.email,
      phoneNumber: record.phoneNumber,
      gender: record.gender,
      birth: dayjs(record.dob, 'DD/MM/YYYY'),
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const user = data.filter((user) => user.id === id)[0];
      updateUser({
        id,
        username: row.username,
        email: row.email,
        password: user.password,
        phoneNumber: row.phoneNumber,
        gender: row.gender,
        dob: row.birth.format('DD/MM/YYYY'),
      });
      messageApi.open({
        type: 'success',
        content: 'Update thành công!',
      });
      const newData = data.map((item) => {
        if (item.id === id) {
          return {
            id,
            username: row.username,
            email: row.email,
            password: user.password,
            phoneNumber: row.phoneNumber,
            gender: row.gender,
            dob: row.birth.format('DD/MM/YYYY'),
          };
        } else return item;
      });
      setData(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const deleteUser = (id) => {
    deleteUserApi(id);
    messageApi.open({
      type: 'success',
      content: 'Delete thành công!',
    });
    const newData = data.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setData(newData);
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '5%',
      editable: false,
    },
    {
      title: 'username',
      dataIndex: 'username',
      width: '15%',
      editable: true,
      filters: usernameSearchList,
      onFilter: (value, record) => record.username.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '20%',
      editable: true,
      filters: emailSearchList,
      onFilter: (value, record) => record.email.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber',
      width: '15%',
      editable: true,
      filters: phoneSearchList,
      onFilter: (value, record) => record.phoneNumber.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      width: '15%',
      editable: true,
      render: (_, record) => {
        return (
          <span>
            {(record.gender === 1 && 'Nam') ||
              (record.gender === 2 && 'Nữ') ||
              'Khác'}
          </span>
        );
      },
    },
    {
      title: 'birth',
      dataIndex: 'birth',
      width: '15%',
      editable: true,
      render: (_, record) => {
        return (
          <span>{dayjs(record.dob, 'DD/MM/YYYY').format('DD/MM/YYYY')}</span>
        );
      },
    },
    {
      title: 'actions',
      dataIndex: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title='Hủy thay đổi?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>

            <Typography.Link disabled={editingKey !== ''}>
              <Popconfirm
                title='Chắc chắn xóa?'
                onConfirm={() => deleteUser(record.id)}
              >
                <span className='ml-4 text-red-600'>Delete</span>
              </Popconfirm>
            </Typography.Link>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          (col.dataIndex === 'gender' && 'select') ||
          (col.dataIndex === 'birth' && 'date') ||
          'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    if (!isLoading) {
      setData(uerList);
    }
  }, [isLoading]);

  return (
    <section className='user-table'>
      {contextHolder}
      <Form form={form} component={false}>
        {isLoading ? (
          <Skeleton></Skeleton>
        ) : (
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data.map((user) => {
              return { ...user, key: user.id };
            })}
            columns={mergedColumns}
            rowClassName='editable-row'
            pagination={{
              onChange: cancel,
            }}
          />
        )}
      </Form>
    </section>
  );
}

export default UserTable;
