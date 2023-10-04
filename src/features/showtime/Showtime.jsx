import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import dayjs from 'dayjs';

import Layout from '../../components/Layout/Layout';
import { useGetShowtimesQuery } from '../../app/api/showtimeService';
import ListShowTime from './ListShowtime';

function Showtime() {
  const { data, isLoading } = useGetShowtimesQuery();
  const { cinema } = useSelector((state) => state.CinemaSlice);

  const filterData = data?.filter(
    (item) =>
      item.cinema.name === cinema && Date.parse(item.startTime) > Date.now()
  );

  let lastDate = Date.now();

  const titles = filterData?.map((item) => {
    if (Date.parse(item.startTime) > lastDate) {
      lastDate = Date.parse(item.startTime);
      const title =
        dayjs(item.startTime).date() +
        '/' +
        (dayjs(item.startTime).month() + 1);
      return title;
    }
  });

  const items = titles?.map((title, index) => {
    const list = filterData?.reduce((arr, item) => {
      if (
        dayjs(item.startTime).date() === dayjs(title, 'D/M').date() &&
        dayjs(item.startTime).month() === dayjs(title, 'D/M').month()
      ) {
        return [
          ...arr,
          {
            movie: item.movie,
            time: [{
              hour: dayjs(item.startTime).hour(),
              minute: dayjs(item.startTime).minute(),
            }],
          },
        ];
      } else return arr;
    }, []);
    return {
      key: (index += 1),
      label: title,
      children: <ListShowTime data={list}></ListShowTime>,
    };
  });

  if (isLoading) {
    return <span>Loading</span>;
  }
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto text-center">
        <Tabs defaultActiveKey="1" items={items} centered />
      </div>
    </Layout>
  );
}

export default Showtime;
