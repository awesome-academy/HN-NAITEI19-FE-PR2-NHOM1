import { Modal, Table } from 'antd';
import { useState } from 'react';

import { useGetUserRatesQuery } from '../../../features/moviedetail/components/RateService';

const columns = [
  {
    title: 'Stt',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên phim',
    dataIndex: 'movieName',
    key: 'movieName',
  },
  {
    title: 'Đánh giá',
    dataIndex: 'rate',
    key: 'rate',
  },
];

function RateTable({ isModalOpen, setModalContent }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const { data, isLoading } = useGetUserRatesQuery(user.id);
  if (isLoading) {
    return <span>Loading ...</span>;
  }
  const tableData = data?.map((item, index) => {
    return {
      key: item.id,
      stt: (index += 1),
      movieName: item.movie.name,
      rate: item.rate,
    };
  });

  const hideModal = () => {
    setModalContent(
      <RateTable
        isModalOpen={false}
        setModalContent={setModalContent}
      ></RateTable>
    );
  };
  return (
    <Modal open={isModalOpen} onOk={hideModal} onCancel={hideModal}>
      <Table columns={columns} dataSource={tableData} />
    </Modal>
  );
}

export default RateTable;
