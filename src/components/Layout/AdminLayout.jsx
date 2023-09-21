import { Button, Divider, Input, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import logo from '../../assets/imgs/logo.png';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  PlaySquareOutlined,
  PlaySquareFilled,
} from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SidebarButton = ({ icon, activedIcon, text, href, collapsed }) => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isActive = currentPath
    .slice(1)
    .split('/')
    .includes(href.slice(1).split('/')[1]);

  return (
    <button
      className={
        isActive
          ? `flex w-full items-center ${
              collapsed ? 'justify-center' : 'justify-start'
            } gap-4 rounded-md py-2 px-3 text-white bg-blue-500 transition-colors hover:bg-blue-500`
          : `flex w-full items-center ${
              collapsed ? 'justify-center' : 'justify-start'
            } gap-4 rounded-md py-2 px-3 text-white transition-colors hover:bg-blue-500`
      }
      onClick={() => navigate(href)}
    >
      {isActive ? activedIcon : icon}
      {collapsed ? (
        <></>
      ) : (
        <p className={isActive ? 'font-semibold' : 'font-medium'}>{text}</p>
      )}
    </button>
  );
};

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen" hasSider>
      <Sider
        className=" text-white flex flex-col justify-between p-2"
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div className="py-2 border-b-2 border-gray-500">
          <Link to={'/admin'}>
            <img src={logo} alt="logo" className="object-scale-down" />
          </Link>
        </div>
        <div className="flex w-full grow flex-col items-center justify-start gap-1 my-3">
          <SidebarButton
            icon={<PlaySquareOutlined />}
            activedIcon={<PlaySquareFilled />}
            text={'Phim'}
            href={'/admin/movies'}
            collapsed={collapsed}
          />
        </div>
      </Sider>
      <Layout className="bg-gray-200 h-full overflow-y-auto">
        <Header className="bg-white px-2 flex flex-row items-center justify-between h-16">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="w-[250px]">
            <Input placeholder="Tìm kiếm ..." prefix={<SearchOutlined />} />
          </div>
        </Header>
        <Content className="p-3 h-max">
          <div className="p-4 bg-white min-h-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;