import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchMovieQuery } from '../../../list/movieService';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function Detail() {
  const { id } = useParams();
  const { data, isLoading } = useFetchMovieQuery(id);
  const navigate = useNavigate();

  return (
    <AdminLayout>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <>
          <div className="md:grid grid-cols-12 justify-start gap-3">
            <div className="col-span-3">
              <img
                src={data?.image}
                alt={`movie-image-${data?.id}`}
                className="w-full rounded-md"
              />
            </div>
            <div className="col-span-9">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-3xl font-bold my-4">{data?.name}</h2>
                <Button
                  icon={<EditOutlined />}
                  ghost
                  type="primary"
                  onClick={() => navigate('/admin/movies/edit/' + id)}
                >
                  Chỉnh sửa
                </Button>
              </div>
              <p className="text-lg mb-4">{data?.description}</p>
              <div className="grid grid-cols-8 sm:text-sm md:text-md lg:text-lg">
                <div className="col-span-3 font-bold uppercase">Đạo diễn:</div>
                <div className="col-span-5">{data?.director}</div>
                <div className="col-span-3 font-bold uppercase">Diễn viên:</div>
                <div className="col-span-5">{data.performer?.join(', ')}</div>
                <div className="col-span-3 font-bold uppercase">Thể loại:</div>
                <div className="col-span-5">{data?.categories.join(', ')}</div>
                <div className="col-span-3 font-bold uppercase">
                  Thời lượng:
                </div>
                <div className="col-span-5">{data?.duration} phút</div>
                <div className="col-span-3 font-bold uppercase">Ngôn ngữ:</div>
                <div className="col-span-5">{data?.language}</div>
                <div className="col-span-3 font-bold uppercase">
                  Ngày khởi chiếu:
                </div>
                <div className="col-span-5">{data?.openDate}</div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col items-center gap-5">
            <h2 className="text-3xl border-b-2 border-gray-500 px-4 font-bold">
              Trailer
            </h2>
            <iframe
              src={data?.linkPreview}
              title={data?.name}
              allowFullScreen
              className="w-full md:w-3/4 h-[50vh] md:h-[75vh]"
            ></iframe>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

export default Detail;
