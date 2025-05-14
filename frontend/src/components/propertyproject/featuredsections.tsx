import React from 'react';
import { Box, Heading, Image, Text, Button, Flex } from '@chakra-ui/react';

interface FeaturedItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const featuredData: FeaturedItem[] = [
  {
    id: 1,
    title: 'Nhìn Từ An Căn Hộ View Sông Sài Gòn Tại Thủ Đức',
    description: 'Nhà đẹp, giá tốt',
    image: 'https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const FeaturedSection: React.FC = () => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="md" color="gray.700">
          Dành riêng cho bạn
        </Heading>
        <Button
          color="red.500"
          size="sm"
          _hover={{ textDecoration: 'underline' }}
        >
          Xem tất cả
        </Button>
      </Flex>
      {featuredData.map((item) => (
        <Box key={item.id} borderRadius="md" overflow="hidden">
          <Image src={item.image} alt={item.title} objectFit="cover" w="100%" h="200px" />
          <Box p={4}>
            <Text fontWeight="bold" fontSize="md" color="gray.800" mb={2}>
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {item.description}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedSection;