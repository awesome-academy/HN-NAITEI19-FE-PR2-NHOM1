import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import { useGetMoviesQuery } from '../../app/api/movieService';
import MovieDetail from './components/list/MovieDetail';
import { setSearchString } from '../../app/store/filterSlice';

function Movies() {
  const { data, isLoading } = useGetMoviesQuery();
  const { searchString } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  if (isLoading) {
    return <span>Loading</span>;
  }

  return (
    <Layout>
      <div className="max-w-screen-xl my-5 mx-auto flex justify-end">
        <Input
          placeholder="Tìm kiếm ..."
          prefix={<SearchOutlined />}
          value={searchString}
          size="large"
          onChange={(e) => dispatch(setSearchString(e.target.value))}
          className="w-72"
        />
      </div>
      <div className="max-w-screen-xl my-5 mx-auto grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <MovieDetail key={item.id} movie={item} />
        ))}
      </div>
    </Layout>
  );
}

export default Movies;
