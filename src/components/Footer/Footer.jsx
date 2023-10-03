import { Col, Row } from 'antd';
import {
  RightOutlined,
  FacebookFilled,
  YoutubeFilled,
  InstagramFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Footer.css';
import Logo from '../../assets/imgs/logo.png';
import FooterLogo from '../../assets/imgs/dathongbao.png';

function Footer() {
  return (
    <footer className="footer w-full border-t-2">
      <div className="max-w-screen-xl pt-12 px-4 mx-auto">
        <Row>
          <Col md={24} xl={4} className="px-4">
            <Link to="/">
              <img className="mb-2" src={Logo} alt="Logo" />
            </Link>
            <ul>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Tuyển dụng
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Giới thiệu
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Liên hệ
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  F.A.Q
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Hoạt động xã hội
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Điều khoản sử dụng
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Chính sách thanh toán, đổi trả - hoàn vé
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Liên hệ quảng cáo
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Điều khoản bảo mật
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Hướng dẫn đặt vé online
                </a>
              </li>
            </ul>
          </Col>
          <Col md={24} xl={10} className="px-4">
            <span className="footer-title text-lg font-bold pb-2">
              CỤM RẠP BETA
            </span>

            <ul className="mt-6">
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Empire Bình Dương - Hotline 0934 573 748
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Quang Trung, tp Hồ Chí Minh - Hotline 0369 465
                  730
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Giải Phóng, Hà Nội - Hotline 0585 680 360
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Thanh Xuân, Hà Nội - Hotline 082 4812878
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Mỹ Đình, Hà Nội - Hotline 0866 154 610
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Đan Phượng, Hà Nội - Hotline 0983 901 714
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Thái Nguyên - Hotline 0867 460 053
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Thanh Hóa - Hotline 0325 360 249
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Bắc Giang - Hotline 0866 493 413
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Nha Trang, Khánh Hòa - Hotline 0399 475 165
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Biên Hòa, Đồng Nai - Hotline 0908 360 537
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Long Khánh, Đồng Nai - Hotline 0925165684
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Long Thành, Đồng Nai - Hotline 0927 168 911
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Phú Mỹ, Bà Riạ Vũng Tàu - Hotline 0886 006 310
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Hồ Tràm, Bà Rịa Vũng Tàu - Hotline 0254 3788601
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Beta Cinemas Tân Uyên, Bình Dương - Hotline 0937 905 925
                </a>
              </li>
              <li className="text-sm font-medium mb-2">
                <RightOutlined className="text-xs mr-2" />
                <a className="hover:underline" href="#">
                  Tải Ứng Dụng Beta Cinemas
                </a>
              </li>
            </ul>
          </Col>
          <Col md={24} xl={5} className="px-4">
            <span className="footer-title text-lg font-bold pb-2">
              KẾT NỐI VỚI CHÚNG TÔI
            </span>

            <div className="mt-6 flex items-center text-3xl text-gray-400">
              <div className="flex-1">
                <FacebookFilled className="mr-2 cursor-pointer hover:text-blue-600" />
                <YoutubeFilled className="cursor-pointer hover:text-red-500" />
              </div>
              <div className="flex-1">
                <InstagramFilled className="cursor-pointer hover:text-yellow-700" />
              </div>
            </div>

            <img className="w-4/5 mt-4" src={FooterLogo} alt="Bo Cong Thuong" />
          </Col>
          <Col md={24} xl={5} className="px-4">
            <span className="footer-title text-lg font-bold pb-2">LIÊN HỆ</span>

            <h2 className="mt-8 uppercase text-sm font-medium">
              CÔNG TY CỔ PHẦN BETA MEDIA
            </h2>

            <p className="mt-4 text-xs">
              Giấy chứng nhận ĐKKD số: 0106633482 - Đăng ký lần đầu ngày
              08/09/2014 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội
            </p>
            <p className="mt-4 text-xs">
              Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp Bát,
              quận Hoàng Mai, thành phố Hà Nội
            </p>
            <p className="mt-4 text-xs">Hotline: 1900 636807</p>
            <p className="mt-4 text-xs">Email: cskh@betacorp.vn</p>
            <p className="mt-4 text-base font-bold">
              Liên hệ hợp tác kinh doanh:
            </p>
            <p className="mt-4 text-base font-medium">phuongdh@betamedia.vn</p>
          </Col>
        </Row>
      </div>
    </footer>
  );
}

export default Footer;
