import React from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

// Define the type for a topic or project
interface Item {
  name: string;
}

// Define the type for a column
interface Column {
  title: string;
  items: Item[];
}

// Sample data for featured topics
const columns: Column[] = [
  {
    title: 'Tất cả các chủ đề',
    items: [
      { name: 'Tìm kiếm bất động sản' },
      { name: 'Bất động sản Hà Nội' },
      { name: 'Bất động sản Hồ Chí Minh' },
      { name: 'Báo cáo thị trường' },
      { name: 'Mua bất động sản' },
      { name: 'Bán bất động sản' },
      { name: 'Thuê bất động sản' },
      { name: 'Quy hoạch - Pháp lý' },
      { name: 'Tài chính' },
      { name: 'Video đánh giá' },
      { name: 'Xem thêm' },
    ],
  },
  {
    title: 'Bất động sản bán / cho thuê tại Hà Nội',
    items: [
      { name: 'Cho thuê căn hộ chung cư tại Hà Nội' },
      { name: 'Cho thuê nhà riêng Hà Nội' },
      { name: 'Cho thuê nhà biệt thự, liền kề Hà Nội' },
      { name: 'Cho thuê nhà mặt phố Hà Nội' },
      { name: 'Cho thuê shophouse Hà Nội' },
      { name: 'Cho thuê nhà trọ, phòng trọ Hà Nội' },
      { name: 'Cho thuê văn phòng Hà Nội' },
      { name: 'Cho thuê, sang nhượng cửa hàng, ki ốt Hà Nội' },
      { name: 'Cho thuê kho, nhà xưởng, đất Hà Nội' },
      { name: 'Cho thuê căn hộ chung cư mini Hà Nội' },
    ],
  },
  {
    title: 'Bất động sản bán / cho thuê tại Hồ Chí Minh',
    items: [
      { name: 'Cho thuê căn hộ chung cư tại Hồ Chí Minh' },
      { name: 'Cho thuê nhà riêng Hồ Chí Minh' },
      { name: 'Cho thuê nhà biệt thự, liền kề Hồ Chí Minh' },
      { name: 'Cho thuê nhà mặt phố Hồ Chí Minh' },
      { name: 'Cho thuê shophouse Hồ Chí Minh' },
      { name: 'Cho thuê nhà trọ, phòng trọ Hồ Chí Minh' },
      { name: 'Cho thuê văn phòng Hồ Chí Minh' },
      { name: 'Cho thuê, sang nhượng cửa hàng, ki ốt Hồ Chí Minh' },
      { name: 'Cho thuê kho, nhà xưởng, đất Hồ Chí Minh' },
      { name: 'Cho thuê căn hộ chung cư mini Hồ Chí Minh' },
    ],
  },
  {
    title: 'Dự án nổi bật tại',
    items: [
      { name: 'An Lạc Green Symphony' },
      { name: 'Lidaco-Vinaconex 7' },
      { name: 'An Thịnh Villa' },
      { name: 'Thanh Bình Garden' },
      { name: 'The Zurich' },
      { name: 'Netland Building' },
      { name: 'Epic Tower' },
      { name: 'The Melody Residence Ciputra' },
      { name: 'HDI Me Linh Central' },
      { name: 'Center Point' },
    ],
  },
];

// FeaturedTopics component
const FeaturedTopics: React.FC = () => {
  return (
    <Box p={5} maxW="1200px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={6}>
        Chủ đề nổi bật
      </Heading>

      {/* Grid of Columns */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
        {columns.map((column, index) => (
          <Box key={index}>
            <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.600">
              {column.title}
            </Text>
            {column.items.map((item, idx) => (
              <Text key={idx} fontSize="sm" mb={1}>
                {item.name}
              </Text>
            ))}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedTopics;