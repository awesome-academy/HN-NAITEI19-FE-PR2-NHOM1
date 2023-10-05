import React from 'react';
import { Tabs } from 'antd';
import './List.css';
import TabList from './TabList';

const items = [
  {
    key: '1',
    label: 'PHIM SẮP CHIẾU',
    children: <TabList movieStatus={1} />,
  },
  {
    key: '2',
    label: 'PHIM ĐANG CHIẾU',
    children: <TabList movieStatus={2} />,
  },
  {
    key: '3',
    label: 'SUẤT CHIẾU ĐẶC BIỆT',
    children: <TabList movieStatus={3} />,
  },
];

const MovieList = () => (
  <Tabs className="list" centered defaultActiveKey="2" items={items} />
);

export default MovieList;
