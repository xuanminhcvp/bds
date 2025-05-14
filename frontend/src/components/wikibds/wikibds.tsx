import React from 'react';
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';

// Define the type for an article
interface Article {
  date: string;
  category: string;
  title: string;
  image?: string;
}

// Sample data for the featured article and recent articles
const featuredArticle: Article = {
  date: '03/06/2024 15:01',
  category: 'Mua BDS',
  title: 'Kinh Nghiệm Mua Nhà Đô - Chi Tiết Từng Bước Cho Người Mua Lần Đầu',
  image: 'https://img.iproperty.com.my/angel/520x300-crop/wp-content/uploads/sites/7/2024/05/lai-suat-ngan-hang-VPBank-1.jpg', // Placeholder image
};

const recentArticles: Article[] = [
  {
    date: '30/04/2025 09:05',
    category: 'Phong thủy',
    title: 'Sinh Năm 1965 Mệnh Gì? Chọn Hướng Nhà, Màu Sắc Hợp Phong Thủy',
  },
  {
    date: '29/04/2025 14:11',
    category: 'Phong thủy',
    title: 'Sinh Năm 2000 Tuổi Con Gì? Tử Tần Tốt Thông Tin Phong Thủy Tuổi Canh Thìn',
  },
  {
    date: '29/04/2025 10:05',
    category: 'Phong thủy',
    title: 'Tuổi Tý 1965 Hợp Màu Gì Sơn Nhà? Giải Mã Phong Thủy Màu Sắc Cho Tuổi Ất Tý',
  },
];

// Main App component
const WikiBds1: React.FC = () => {
  return (
      <Box p={5} maxW="1200px" mx="auto">
        {/* Header */}
        <Heading as="h1" size="2xl" textAlign="center" mb={4}>
          Wiki BDS
        </Heading>

        {/* Description */}
        <Text fontSize="lg" textAlign="center" mb={8}>
          Wiki bất động sản là căn mang đáp ứng tất cả nhu cầu của người tìm kiếm thông tin bất động sản bao gồm các chỉ dẫn mua-bán, đầu tư, thuê và cho thuê; các thông tin về tài chính, pháp lý, quy hoạch v.v...
        </Text>

        {/* Main Content and Sidebar */}
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          {/* Featured Article */}
          <Box flex="3">
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={featuredArticle.image} alt="Featured article" />
              <Box p={4}>
                <Text fontSize="sm" color="gray.500">
                  {featuredArticle.date} - {featuredArticle.category}
                </Text>
                <Heading as="h2" size="md" mt={2}>
                  {featuredArticle.title}
                </Heading>
              </Box>
            </Box>
          </Box>

          {/* Sidebar with Recent Articles */}
          <Box flex="1">
            {recentArticles.map((article, index) => (
              <Box key={index} mb={4} p={3} borderWidth="1px" borderRadius="lg">
                <Text fontSize="sm" color="gray.500">
                  {article.date} - {article.category}
                </Text>
                <Text fontWeight="bold" mt={1}>
                  {article.title}
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
  );
};

export default WikiBds1;