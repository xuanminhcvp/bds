import React from 'react';
import { Box, Flex, Heading, Image, Text, Button } from '@chakra-ui/react';

// Define the type for an article
interface Article {
  category: string;
  image: string;
  date: string;
  author: string;
  title: string;
  content: string;
  relatedTopics: string[];
}

// Sample data for latest guides
const articles: Article[] = [
  {
    category: 'PHONG THỦY',
    image: 'https://img.iproperty.com.my/angel/520x300-crop/wp-content/uploads/sites/7/2025/04/1966-hop-huong-nao-1.jpg',
    date: '28/04/2025 17:16',
    author: 'Hoài Tường',
    title: 'Sinh Năm 1966 Mệnh Gì? Xây Nhà Hướng Nào May Mắn, Tài Lộc?',
    content: 'Nam, nữ sinh năm 1966 mệnh gì? Bính Ngọ 1966 xây nhà hướng nào hợp mệnh năm 2025? Là nội dung được nhiều người quan tâm để chọn hướng xây nhà hợp mệnh, hợp tuổi theo phong thủy. Hãy cùng tìm hiểu nội dung...',
    relatedTopics: ['Phong thủy theo tuổi'],
  },
  {
    category: 'TÀI CHÍNH BDS',
    image: 'https://img.iproperty.com.my/angel/520x300-crop/wp-content/uploads/sites/7/2025/04/1966-hop-huong-nao-1.jpg',
    date: '25/04/2025 14:02',
    author: 'Hà Linh',
    title: 'Lãi Suất Ngân Hàng VPBank Mới Nhất Tháng 04/2025',
    content: 'Khách hàng gửi tiết kiệm tại ngân hàng VPBank trong tháng 4 sẽ được hưởng mức lãi suất cao nhất là 5.8%/năm. Đối với nhà đầu vay mua, chuyên nhân đầu tư, lãi suất VPBank cũng có nhiều ưu đãi. Chi...',
    relatedTopics: ['Lãi suất ngân hàng'],
  },
];

const PropertyCard: React.FC = () => {
  return (
    <Box p={5} maxW="600px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={6}>
        Cẩm nang Wiki BDS mới nhất
      </Heading>

      {/* Stack of Article Cards */}
      <Flex direction="column" gap={6}>
        {articles.map((article, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image src={article.image} alt={article.title} />
            <Box p={4}>
              <Text fontSize="xs" color="gray.500" mb={2}>
                {article.category}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                {article.date} - {article.author}
              </Text>
              <Heading as="h3" size="sm" mb={2}>
                {article.title}
              </Heading>
              <Text fontSize="sm" mb={4}>
                {article.content}
              </Text>
              <Flex gap={2}>
                {article.relatedTopics.map((topic, idx) => (
                  <Button key={idx} size="xs" variant="outline" colorScheme="gray">
                    {topic}
                  </Button>
                ))}
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PropertyCard;