import React from 'react';
import { Box, Grid, GridItem, Heading, Link, VStack } from '@chakra-ui/react';

// Define the type for each link category
interface LinkCategory {
  title: string;
  links: { label: string; isMoreLink?: boolean }[];
}

// Sample data based on the image
const linkData: LinkCategory[] = [
  {
    title: 'Chủ đề nổi bật',
    links: [
      { label: 'Tin tức bất động sản' },
      { label: 'Bất động sản Hà Nội' },
      { label: 'Bất động sản Hồ Chí Minh' },
      { label: 'Báo cáo thị trường' },
      { label: 'Mua bán bất động sản' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
  {
    title: 'Dự án nổi bật',
    links: [
      { label: 'Căn hộ chung cư' },
      { label: 'Biệt thự, liền kề' },
      { label: 'Khu đô thị mới' },
      { label: 'Khu phức hợp' },
      { label: 'Nhà ở xã hội' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
  {
    title: 'Bất động sản bán',
    links: [
      { label: 'Bán căn hộ chung cư' },
      { label: 'Bán chung cư mini, căn hộ dịch vụ' },
      { label: 'Bán nhà riêng' },
      { label: 'Bán biệt thự, liền kề' },
      { label: 'Bán nhà mặt phố, mặt tiền' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
  {
    title: 'Bất động sản thuê',
    links: [
      { label: 'Thuê căn hộ chung cư' },
      { label: 'Thuê chung cư mini, căn hộ dịch vụ' },
      { label: 'Thuê nhà riêng' },
      { label: 'Thuê biệt thự, liền kề' },
      { label: 'Thuê nhà mặt phố, mặt tiền' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
  {
    title: 'Bất động sản toàn quốc',
    links: [
      { label: 'Mua bán bất động sản Hà Nội' },
      { label: 'Cho thuê bất động sản Hà Nội' },
      { label: 'Mua bán bất động sản Hồ Chí Minh' },
      { label: 'Cho thuê bất động sản Hồ Chí Minh' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
  {
    title: 'Chủ đề nổi bật',
    links: [
      { label: 'Bất động sản Văn Vinhomes' },
      { label: 'Bất động sản Sunshine' },
      { label: 'Bất động sản Phú Mỹ Hưng' },
      { label: 'Bất động sản Masterise Homes' },
      { label: 'Bất động sản Hưng Thịnh' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
  {
    title: 'Bất động sản Quận/Huyện',
    links: [
      { label: 'Căn hộ chung cư Hà Nội' },
      { label: 'Nhà riêng Hà Nội' },
      { label: 'Biệt thự, liền kề Hà Nội' },
      { label: 'Nhà mặt phố Hà Nội' },
      { label: 'Shophouse, nhà phố Hà Nội' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
  {
    title: 'Số bất động sản toàn quốc',
    links: [
      { label: 'Giá căn hộ chung cư' },
      { label: 'Giá nhà đất' },
      { label: 'Giá biệt thự, liền kề' },
      { label: 'Giá nhà mặt phố, mặt tiền' },
      { label: 'Giá shophouse, nhà phố' },
      { label: 'Xem thêm', isMoreLink: true },
    ],
  },
];

const FooterLinks: React.FC = () => {
  return (
    <Box p={4}>
      {/* Links Grid */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
        gap={4}
      >
        {linkData.map((category, index) => (
          <GridItem key={index}>
            <Heading as="h4" size="sm" mb={2}>
              {category.title}
            </Heading>
            <VStack align="start" gap={1}>
              {category.links.map((link, idx) => (
                <Link
                  key={idx}
                  href="#"
                  color={link.isMoreLink ? 'red.500' : 'gray.600'}
                  fontSize="sm"
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default FooterLinks;