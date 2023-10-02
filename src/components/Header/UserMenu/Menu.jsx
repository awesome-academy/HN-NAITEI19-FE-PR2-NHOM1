import { Menu } from 'antd';
import {
  EditOutlined,
  SettingOutlined,
  HistoryOutlined,
  StarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InfoForm from './InfoForm';
import ChangePassForm from './ChangePassForm';
import RateTable from './RateTable';

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Xem thông tin cá nhân', 1, <EditOutlined />),
  getItem('Đổi mật khẩu', 2, <SettingOutlined />),
  getItem('Lịch sử đặt vé', 3, <HistoryOutlined />),
  getItem('Lịch sử đánh giá phim', 4, <StarOutlined />),
  {
    type: 'divider',
  },
  getItem('Đăng xuất', 5, <LogoutOutlined />),
];

function MenuC({ closePopover, user }) {
  const [modalContent, setModalContent] = useState();
  const navigate = useNavigate();

  const onClick = (e) => {
    switch (e.key) {
      case '1':
        setModalContent(
          <InfoForm
            isModalOpen={true}
            setModalContent={setModalContent}
            user={user}
          ></InfoForm>
        );
        break;
      case '2':
        setModalContent(
          <ChangePassForm
            isModalOpen={true}
            setModalContent={setModalContent}
            user={user}
          ></ChangePassForm>
        );
        break;
      case '3':
        // Lịch sử đặt vé
        break;
      case '4':
        // Lịch sử đánh giá phim
        setModalContent(
          <RateTable
            isModalOpen={true}
            setModalContent={setModalContent}
            user={user}
          ></RateTable>
        );
        break;
      case '5':
        localStorage.removeItem('user');
        navigate('/auth');
        break;
      default:
        console.log('ERROR!');
        break;
    }
    closePopover();
  };
  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        selectedKeys={[]}
        mode="inline"
        items={items}
      />
      {modalContent}
    </>
  );
}

export default MenuC;
