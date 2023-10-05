import React from 'react';
import Layout from '../../components/Layout/Layout';

function Success() {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Đặt vé thành công</h1>
          <p className="text-xl mt-4">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Success;
