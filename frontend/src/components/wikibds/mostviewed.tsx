import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

// Define the type for an article
interface Article {
  id: number;
  title: string;
}

// Sample data for most viewed articles
const articles: Article[] = [
  { id: 1, title: 'Cập Nhật Lãi Suất Ngân Hàng Agribank Tháng 05/2025' },
  { id: 2, title: 'Cập Nhật Lãi Suất Ngân Hàng Vietcombank Tháng 04/2025' },
  { id: 3, title: 'Cập Nhật Lãi Suất Vay Mua Nhà VietinBank Tháng 04/2025' },
  { id: 4, title: 'Cập Nhật Lãi Suất Ngân Hàng MBBank Tháng 04/2025' },
  { id: 5, title: 'Cập Nhật Lãi Suất Vay Mua Nhà BIDV Tháng 04/2025' },
];

// MostViewed component
const MostViewed: React.FC = () => {
  return (
    <Box p={5} maxW="300px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={4}>
        Bài viết được xem nhiều nhất
      </Heading>

      {/* Stack of Articles */}
      <Flex direction="column" gap={3}>
        {articles.map((article) => (
          <Flex key={article.id} alignItems="center">
            <Text fontWeight="bold" mr={2} color="red.500">
              {article.id}
            </Text>
            <Box flex="1">
              <Text>{article.title}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default MostViewed;