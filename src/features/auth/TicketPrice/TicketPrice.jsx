import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout/Layout.jsx';
function TicketPrice() {
  const ticketList = [
    {
      key: '1',
      label: 'Beta Thanh Xuân',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-tx-app-112540-231222-96.png',
    },
    {
      key: '2',
      label: 'Beta Mỹ Đình',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-md-app-112540-231222-64.png',
    },
    {
      key: '3',
      label: 'Beta Đan Phượng',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-dp-04-112540-231222-39.png',
    },
    {
      key: '4',
      label: 'Beta Giải Phóng',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-gp-04-112540-231222-56.png',
    },
    {
      key: '5',
      label: 'Beta Merchandise',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-gp-04-112540-231222-56.png',
    },
    {
      key: '6',
      label: 'Beta Quang Trung',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-qt-04-092110-100123-47.png',
    },
    {
      key: '7',
      label: 'Beta Bắc Giang',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-bg-04-112540-231222-96.png',
    },
    {
      key: '8',
      label: 'Beta Biên Hòa',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-bh-04-112540-231222-78.png',
    },
    {
      key: '9',
      label: 'Beta Long Khánh',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-lk-151405-231222-80.png',
    },
    {
      key: '10',
      label: 'Beta Long Thành',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-lt-151405-231222-15.png',
    },
    {
      key: '11',
      label: 'Beta Nha Trang',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-nt-05-121039-231222-19.png',
    },
    {
      key: '12',
      label: 'Beta Thái Nguyên',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-tn-04-112540-231222-24.png',
    },
    {
      key: '13',
      label: 'Beta Thanh Hóa',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-th-04-114445-231222-90.png',
    },
    {
      key: '14',
      label: 'Beta Phú Mỹ',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-pm-04-121644-231222-83.png',
    },
    {
      key: '15',
      label: 'Beta Hồ Tràm',
      img: 'src/assets/imgs/TicketPrice/Bảng giá vé Ho Tram-04 (1).png',
    },
    {
      key: '16',
      label: 'Beta Empire Bình Dương',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-empire-04-114445-231222-26.png',
    },
    {
      key: '17',
      label: 'Beta Tân Uyên',
      img: 'src/assets/imgs/TicketPrice/bang-gia-ve-tan-uyen-04-114445-231222-97.png',
    },
  ];

  const { cinema } = useSelector((state) => state.CinemaSlice);
  const ticket = ticketList.filter((item) => item.label === cinema)[0]?.img;
  return (
    <Layout>
      <section className='max-w-screen-xl mx-auto my-10 text-2xl font-semibold '>
        <h2 className='uppercase'>{'GIÁ VÉ RẠP ' + cinema}</h2>
        <img
          src={ticket}
          alt='ticket price'
          className='mx-auto my-8 border-blue-200 border-2'
        />
      </section>
    </Layout>
  );
}

export default TicketPrice;
