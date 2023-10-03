import React, { useEffect } from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import ReactApexChart from 'react-apexcharts';
import { LoadingOutlined } from '@ant-design/icons';

import lineChart from './configChart';
import {
  useGetIncomeByMonthQuery,
  useGetIncomeTodayQuery,
} from '../../../../app/api/incomeService';
import Ticket from './Ticket';

function MovieDashboard({ className }) {
  return <div className={className}></div>;
}

function MonthChart({ className }) {
  const { data: incomeByMonths, isLoading } = useGetIncomeByMonthQuery();

  if (isLoading) return <LoadingOutlined />;

  return (
    <div className={className}>
      <h1 className="text-2xl font-bold">Thống kê doanh thu theo tháng</h1>
      <ReactApexChart
        className="w-full"
        options={lineChart.options}
        series={[
          {
            name: 'Doanh thu',
            data: incomeByMonths.slice(0, new Date().getMonth() + 1),
            offsetY: 0,
          },
        ]}
        type="area"
        height={320}
      />
    </div>
  );
}

function IncomeToday({ className }) {
  const { data: incomeToday, isLoading } = useGetIncomeTodayQuery();

  if (isLoading) return <LoadingOutlined />;

  return (
    <div className={className}>
      <h1 className="text-2xl font-bold mb-5">Doanh thu hôm nay</h1>
      <p className="text-4xl font-extrabold">
        {incomeToday?.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}
      </p>
    </div>
  );
}

function Income() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-12 gap-3">
        <IncomeToday className="w-full col-span-4" />
        <MonthChart className="w-full col-span-8" />
        <Ticket className="w-full col-span-full" />
      </div>
    </AdminLayout>
  );
}

export default Income;
