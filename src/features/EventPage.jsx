import { Col, Row, Skeleton } from 'antd';

import Layout from '../components/Layout/Layout';
import Event from '../components/Event/Event';
import { useGetSalesQuery, useGetNewsQuery } from './eventService';

function EventPage() {
  const { data: saleList, isLoading: saleLoading } = useGetSalesQuery();
  const { data: newList, isLoading: newLoading } = useGetNewsQuery();

  return (
    <Layout>
      <section className='max-w-screen-xl mx-auto'>
        <h2 className='uppercase my-5 text-3xl font-bold hover:cursor-pointer hover:text-blue-500 hover:underline'>
          KHUYẾN MÃI MỚI
        </h2>
        <Row>
          {saleLoading ? (
            <Skeleton />
          ) : (
            saleList.map((item, index) => {
              return (
                <Col
                  key={item.id}
                  lg={index === 0 ? 12 : 6}
                  md={index === 0 ? 24 : 12}
                >
                  <Event hotEvent={index === 0} event={item}></Event>
                </Col>
              );
            })
          )}
        </Row>

        <h2 className='uppercase my-5 text-3xl font-bold hover:cursor-pointer hover:text-blue-500 hover:underline'>
          TIN BÊN LỀ
        </h2>
        <Row>
          {newLoading ? (
            <Skeleton />
          ) : (
            newList.map((item, index) => {
              return (
                <Col
                  key={item.id}
                  lg={index === 0 ? 12 : 6}
                  md={index === 0 ? 24 : 12}
                >
                  <Event hotEvent={index === 0} event={item}></Event>
                </Col>
              );
            })
          )}
        </Row>
      </section>
    </Layout>
  );
}

export default EventPage;
