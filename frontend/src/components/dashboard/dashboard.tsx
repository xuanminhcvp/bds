import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Link,
  Button,
  Accordion,
  Span
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaUser,
  FaList,
  FaUsers,
  FaGem,
  FaWallet,
  FaBox,
  FaChartLine,
  FaCog,
  FaMoneyBillWave
} from 'react-icons/fa';

const sidebarItems = [
  {
    value: 'overview',
    title: 'Tổng quan',
    icon: FaUser,
    links: [
      { label: 'Tổng quan', to: '/tongquan' }
    ]
  },
  {
    value: 'posts',
    title: 'Quản lý tin đăng',
    icon: FaList,
    links: [
      { label: 'Đăng mới', to: '/dangmoi' },
      { label: 'Danh sách tin', to: '/danhsachtin' },
      { label: 'Tin nháp', to: '/tinnhap' },
      { label: 'Danh sách tin trả lời', to: '/danhsachtintraloi' }
    ]
  },
  {
    value: 'customers',
    title: 'Quản lý khách hàng',
    icon: FaUsers,
    links: [
      { label: 'Quản lý khách hàng', to: '/quanlykhachhang' }
    ]
  },
  {
    value: 'membership',
    title: 'Gói Hội viên',
    icon: FaGem,
    links: [
      { label: 'Tiết kiệm đến -39%', to: '/goihoivien' }
    ]
  },
  {
    value: 'buy-request',
    title: 'Đăng ký mua',
    icon: FaWallet,
    links: [
      { label: 'Đăng ký mua', to: '/dangky mua' }
    ]
  },
  {
    value: 'pro-account',
    title: 'Tài khoản Pro',
    icon: FaBox,
    links: [
      { label: 'Đăng ký mua', to: '/taikhoanpro/dangky' }
    ]
  },
  {
    value: 'finance',
    title: 'Quản lý tài chính',
    icon: FaChartLine,
    links: [
      { label: 'Thống kê số dư', to: '/taichinh/thongke' },
      { label: 'Lịch sử giao dịch', to: '/taichinh/lichsu' },
      { label: 'Nhóm khuyến mãi', to: '/taichinh/nhomkhuyenmai' },
      { label: 'Nạp tiền vào tài khoản', to: '/taichinh/naptien' }
    ]
  },
  {
    value: 'personal-account',
    title: 'Quản lý TK Cá nhân',
    icon: FaUser,
    links: [
      { label: 'Chỉnh sửa thông tin cá nhân', to: '/tkcanhan/chinhsua' },
      { label: 'Cài đặt tài khoản', to: '/tkcanhan/caidat' }
    ]
  },
  {
    value: 'business-account',
    title: 'Quản lý TK Doanh nghiệp',
    icon: FaCog,
    links: [
      { label: 'Đăng ký tài khoản Doanh nghiệp...', to: '/tkdoanhnghiep/dangky' }
    ]
  },
  {
    value: 'guides',
    title: 'Báo giá & Hướng dẫn',
    icon: FaMoneyBillWave,
    links: [
      { label: 'Báo giá', to: '/baogia' },
      { label: 'Hướng dẫn thanh toán', to: '/huongdan/thanhtoan' },
      { label: 'Hướng dẫn sử dụng', to: '/huongdan/sudung' }
    ]
  },
  {
    value: 'utilities',
    title: 'Tiện ích',
    icon: FaCog,
    links: [
      { label: 'Thống báo', to: '/tienich/thongbao' },
      { label: 'Quản lý danh sách email', to: '/tienich/quanlyemail' },
      { label: 'Yêu cầu tài khoản', to: '/tienich/yeucau' }
    ]
  }
];

const Dashboard = () => {
  return (
    <Flex minH="100vh">
      <Box w="250px" borderRightWidth="1px" p={4}>
        <VStack align="start" gap={4}>
          <Text fontSize="sm" fontWeight="bold">Số dư tài khoản</Text>
          <Text fontSize="sm">TK Chính: 0</Text>
          <Text fontSize="sm">TK Khuyến mãi: 0</Text>
          <Text fontSize="sm" color="red.500" fontWeight="bold">
            Mã khách hàng<br />BDS54191567
          </Text>
          <Button colorScheme="red" size="sm" width="full">
            Nạp tiền
          </Button>

          <Accordion.Root collapsible defaultValue={["overview"]}>
            {sidebarItems.map((item) => (
              <Accordion.Item key={item.value} value={item.value}>
                <Accordion.ItemTrigger>
                  <Box as={item.icon} mr={2} />
                  <Span flex="1">{item.title}</Span>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    {item.links.map((link, i) => (
                      <Link
                        key={i}
                        as={RouterLink}
                        to={link.to}
                        pl={4}
                        display="block"
                        mb={1}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </VStack>
      </Box>

      <Box flex={1} p={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>QUẢN LÝ KHÁCH HÀNG</Text>
        <Flex mb={6} align="center">
          <Input
            placeholder="Tìm theo tên khách hàng, SĐT hoặc email"
            mr={4}
            width="300px"
          />
        </Flex>
        <Flex justify="space-between">
          <Box flex={1} p={4} borderWidth="1px" borderRadius="md" mr={4} textAlign="center">
            <Text fontWeight="bold">Chưa có khách hàng nào</Text>
            <Text fontSize="sm" color="gray.500">
              Hiện tại bạn chưa có khách hàng nào
            </Text>
          </Box>
          <Box flex={1} p={4} borderWidth="1px" borderRadius="md" textAlign="center">
            <Text fontWeight="bold">Không có khách hàng nào được chọn</Text>
            <Text fontSize="sm" color="gray.500">
              Chọn một khách hàng để xem chi tiết
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;
