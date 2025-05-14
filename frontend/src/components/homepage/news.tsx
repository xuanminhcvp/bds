import React from 'react';
import { Box, Heading, Image, Text, Flex } from '@chakra-ui/react';

// Define the type for each news item
interface NewsItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

// Sample data based on the image
const newsData: NewsItem[] = [
  { id: 1, title: 'TP.Đồng Xoài Tăng Tốc Hà Tăng', subtitle: 'Golden Mile Thành Điềm Sáng', image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
  { id: 2, title: 'Nhà Phố Trung Tâm Hà Nội Giá Rẻ', subtitle: 'Giá Vẫn Thấp Không Tưởng', image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
  { id: 3, title: 'Thép VAS, Thép Xuyên Việt', subtitle: 'Sáng Trên Vùng Quốc Anh Ngòi', image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
];

const News: React.FC = () => {
  return (
    <Box p={4}>
      {/* Heading */}
      <Heading as="h2" size="lg" mb={4}>
        Tin tức bất động sản
      </Heading>

      {/* News Cards with Navigation */}
      <Flex align="center" position="relative">
        {newsData.map((item) => (
          <Box
            key={item.id}
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            mr={4}
            width="300px"
          >
            <Image src={item.image} alt={item.title} objectFit="cover" w="100%" h="200px" />
            <Box p={2}>
              <Text fontWeight="bold" fontSize="md">
                0{item.id} {item.title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {item.subtitle}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default News;