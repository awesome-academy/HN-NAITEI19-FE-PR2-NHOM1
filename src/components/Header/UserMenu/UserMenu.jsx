import { Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

import MenuC from './Menu';
import { useGetUSerQuery } from '../../../app/api/userService';

function UserMenu() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { data, isLoading } = useGetUSerQuery(user.id);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <section className="user-menu text-white cursor-pointer">
      <Popover
        content={<MenuC closePopover={hide} user={data}></MenuC>}
        title="Menu"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <span className="mr-2">{data.username}</span>
        <UserOutlined />
      </Popover>
    </section>
  );
}

export default UserMenu;
