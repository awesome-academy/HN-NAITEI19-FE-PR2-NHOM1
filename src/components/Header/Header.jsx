import { DownOutlined, BarsOutlined } from '@ant-design/icons';
import { Dropdown, Space, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/imgs/logo.png';
import unitedFlag from '../../assets/imgs/united-kingdom.png';
import { selectCinema } from '../../app/store/cinemaSlice';
import UserMenu from './UserMenu/UserMenu';

const items = [
  {
    key: '1',
    label: 'Hà Nội',
    children: [
      {
        key: '1-1',
        label: 'Beta Thanh Xuân',
      },
      {
        key: '1-2',
        label: 'Beta Mỹ Đình',
      },
      {
        key: '1-3',
        label: 'Beta Đan Phượng',
      },
      {
        key: '1-4',
        label: 'Beta Giải Phóng',
      },
      {
        key: '1-5',
        label: 'Beta Merchandise',
      },
    ],
  },
  {
    key: '2',
    label: 'TP Hồ Chí Minh',
    children: [
      {
        key: '2-1',
        label: 'Beta Quang Trung',
      },
    ],
  },
  {
    key: '3',
    label: 'Bắc Giang',
    children: [
      {
        key: '3-1',
        label: 'Beta Bắc Giang',
      },
    ],
  },
  {
    key: '4',
    label: 'Đồng Nai',
    children: [
      {
        key: '4-1',
        label: 'Beta Biên Hòa',
      },
      {
        key: '4-2',
        label: 'Beta Long Khánh',
      },
      {
        key: '4-3',
        label: 'Beta Long Thành',
      },
    ],
  },
  {
    key: '5',
    label: 'Khánh Hòa',
    children: [
      {
        key: '5-1',
        label: 'Beta Nha Trang',
      },
    ],
  },
  {
    key: '6',
    label: 'Thái Nguyên',
    children: [
      {
        key: '6-1',
        label: 'Beta Thái Nguyên',
      },
    ],
  },
  {
    key: '7',
    label: 'Thanh Hóa',
    children: [
      {
        key: '7-1',
        label: 'Beta Thanh Hóa',
      },
    ],
  },
  {
    key: '8',
    label: 'Bà Rịa - Vũng Tàu',
    children: [
      {
        key: '8-1',
        label: 'Beta Phú Mỹ',
      },
      {
        key: '8-2',
        label: 'Beta Hồ Tràm',
      },
    ],
  },
  {
    key: '9',
    label: 'Bình Dương',
    children: [
      {
        key: '9-1',
        label: 'Beta Empire Bình Dương',
      },
      {
        key: '9-2',
        label: 'Beta Tân Uyên',
      },
    ],
  },
];

function Header() {
  const { cinema } = useSelector((state) => state.CinemaSlice);
  const [fixedHeader, setFixedHeader] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const handleSelectCinema = (keyPath) => {
    const selectedCinema = items
      .filter((x) => x.key === keyPath[1])[0]
      .children.filter((x) => x.key === keyPath[0])[0].label;
    dispatch(selectCinema(selectedCinema));
  };

  const navigation = (
    <ul className="navbar">
      <Link className="uppercase hover:text-white" to={'/showtime'}>
        <li className="h-full font-semibold text-lg px-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500">
          Lịch chiếu theo rạp
        </li>
      </Link>
      <Link className="uppercase hover:text-white" to={'/movies'}>
        <li className="h-full font-semibold text-lg px-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500">
          Phim
        </li>
      </Link>
      <Link to={'/cinema'} className="uppercase hover:text-white">
        <li className="h-full font-semibold text-lg px-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500">
          Rạp
        </li>
      </Link>
      <Link to={'/ticket_price'} className="uppercase hover:text-white">
        <li className="h-full font-semibold text-lg px-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500">
          Giá Vé
        </li>
      </Link>
      <Link to={'/news'} className="uppercase hover:text-white">
        <li className="h-full font-semibold text-lg px-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500">
          Tin mới và ưu đãi
        </li>
      </Link>
      <li className="h-full font-semibold text-lg px-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500">
        <a className="uppercase hover:text-white" href="#">
          Nhượng quyền
        </a>
      </li>
      <li className="h-full font-semibold text-lg px-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500">
        <a className="uppercase hover:text-white" href="#">
          Thành Viên
        </a>
      </li>
    </ul>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 24 && !fixedHeader) {
        setFixedHeader(true);
      } else setFixedHeader(false);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setIsLogined(true);
    } else setIsLogined(false);
  }, []);

  return (
    <header>
      <div className="pre-header w-full bg-black h-6">
        <div className="max-w-screen-xl h-full mx-auto flex justify-end items-center">
          {isLogined ? (
            <UserMenu></UserMenu>
          ) : (
            <div className="flex items-center h-full">
              <Link
                to="/auth"
                className="text-white text-sm hover:underline px-2 "
              >
                Đăng nhập
              </Link>
              <Link
                to="/auth"
                className="text-white text-sm hover:underline px-2 border-l-2"
              >
                Đăng ký
              </Link>
            </div>
          )}
          <a href="#" className="pl-2">
            <img src={unitedFlag} alt="united flag" />
          </a>
        </div>
      </div>

      <div
        className={
          'header w-full bg-white h-20 shadow z-50' +
          (fixedHeader ? ' fixed top-0' : '')
        }
      >
        <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between px-8 md:w-full xl:px-0">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="flex items-center flex-1 justify-around">
            <div className="dropdown rounded-lg border-2 mr-4">
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  onSelect: (e) => {
                    handleSelectCinema(e.keyPath);
                  },
                  defaultSelectedKeys: '6-1',
                }}
                arrow
                className="px-4"
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Space>
                    {cinema}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>

            <ul className="navbar hidden xl:flex">
              <li className="h-full font-semibold text-lg px-2 hover:text-blue-500">
                <Link className="uppercase" to="/showtime">
                  Lịch chiếu theo rạp
                </Link>
              </li>
              <li className="h-full font-semibold text-lg px-2 hover:text-blue-500">
                <Link className="uppercase" to="/movies">
                  Phim
                </Link>
              </li>
              <li className="h-full font-semibold text-lg px-2 hover:text-blue-500">
                <Link className="uppercase" to="/cinema">
                  Rạp
                </Link>
              </li>
              <li className="h-full font-semibold text-lg px-2 hover:text-blue-500">
                <Link className="uppercase" to="/ticket_price">
                  Giá Vé
                </Link>
              </li>
              <li className="h-full font-semibold text-lg px-2 hover:text-blue-500">
                <Link className="uppercase" to="/news">
                  Tin mới và ưu đãi
                </Link>
              </li>
              <li className="h-full font-semibold text-lg px-2 hover:text-blue-500">
                <a className="uppercase" to="/">
                  Nhượng quyền
                </a>
              </li>
              <li className="h-full font-semibold text-lg px-2 hover:text-blue-500">
                <a className="uppercase" to="/">
                  Thành Viên
                </a>
              </li>
            </ul>

            <Popover
              content={navigation}
              title="Menu"
              trigger="click"
              placement="bottomRight"
            >
              <BarsOutlined className="block xl:hidden text-lg" />
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
