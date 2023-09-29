import { Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

import MenuC from './Menu';
import { useGetUSerQuery } from '../../../app/api/userService';
function UserMenu() {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const { data: user, isLoading } = useGetUSerQuery(userId);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <section className="user-menu text-white cursor-pointer">
      {isLoading ? (
        <span>Loading ...</span>
      ) : (
        <Popover
          content={<MenuC closePopover={hide} user={user}></MenuC>}
          title="Menu"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <span className="mr-2">{user.username}</span>
          <UserOutlined />
        </Popover>
      )}
    </section>
  );
}

export default UserMenu;
