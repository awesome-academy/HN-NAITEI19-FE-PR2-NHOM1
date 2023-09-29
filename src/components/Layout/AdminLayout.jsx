import { Button, Divider, Input, Layout, Menu, Space } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import logo from '../../assets/imgs/logo.png';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  PlaySquareOutlined,
  PlaySquareFilled,
  ArrowLeftOutlined,
  VideoCameraOutlined,
  VideoCameraFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchString } from '../../features/admin/filterSlice';

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
  const { searchString } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Layout className="h-screen" hasSider>
      <Sider className=" text-white" breakpoint="lg" collapsedWidth="0">
        <div className="h-full flex flex-col justify-between p-2">
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
            />
            <SidebarButton
              icon={<VideoCameraOutlined />}
              text={'Suất chiếu'}
              activedIcon={<VideoCameraFilled />}
              href={'/admin/showtimes'}
            />
            <SidebarButton
              icon={<PlaySquareOutlined />}
              activedIcon={<PlaySquareFilled />}
              text={'Người dùng'}
              href={'/admin/users'}
            />
          </div>
          <button
            className="w-full flex flex-row justify-start items-center gap-4"
            onClick={() => {
              localStorage.removeItem('user');
              navigate('/auth');
            }}
          >
            <LogoutOutlined />
            <span>Đăng xuất</span>
          </button>
        </div>
        <div className="flex w-full grow flex-col items-center justify-start gap-1 my-3">
          <SidebarButton
            icon={<PlaySquareOutlined />}
            activedIcon={<PlaySquareFilled />}
            text={'Người dùng'}
            href={'/admin/users'}
          />
        </div>
      </Sider>
      <Layout className="bg-gray-200 h-full overflow-y-auto">
        <Header className="bg-white px-2 flex flex-row items-center justify-between h-16">
          <button
            className="flex items-center justify-center gap-2 transition-colors hover:text-primary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined />
            <p>Trở về</p>
          </button>
          <div className="w-[30%] md:w-[250px]">
            <Input
              placeholder="Tìm kiếm ..."
              prefix={<SearchOutlined />}
              value={searchString}
              onChange={(e) => dispatch(setSearchString(e.target.value))}
            />
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
