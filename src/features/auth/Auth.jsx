import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Layout from '../../components/Layout/Layout';

function Auth() {
  const [tab, setTab] = useState(1);

  return (
    <Layout>
      <div className="w-full bg-gray-100 flex flex-col items-center py-4">
        <div className="w-full md:max-w-[500px]">
          <div className="flex flex-row items-center border-b-2">
            <button
              onClick={() => setTab(1)}
              className={`flex-grow text-center font-semibold py-2 ${
                tab === 1 ? 'bg-blue-700 text-white' : 'text-black'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setTab(2)}
              className={`flex-grow text-center font-semibold py-2 ${
                tab === 2 ? 'bg-blue-700 text-white' : 'text-black'
              }`}
            >
              Đăng ký
            </button>
          </div>
          {tab === 1 ? <Login /> : <SignUp />}
        </div>
      </div>
    </Layout>
  );
}

export default Auth;
