import React from 'react';
import { Box, Heading, Text, Image, VStack, HStack, Link } from '@chakra-ui/react';

const newsItems = [
  {
    id: 1,
    title: 'Cập Nhât Lãi Suất Vay Mua Nhà BIDV Tháng 05/2025',
    image: 'https://images.unsplash.com/photo-1746990263194-0e2826fed608',
    date: 'Hôm nay',
  },
  {
    id: 2,
    title: 'Tin Hiệu Quy Luật Kim Sinh Thủy Trong Ngũ Hành Tường Sinh',
    image: 'https://images.unsplash.com/photo-1746990263194-0e2826fed608',
    date: 'Hôm nay',
  },
  {
    id: 3,
    title: 'Tron Bê Lại Sút Vay Mua Nhà Mới Nhất Tháng 5/2025',
    image: 'https://images.unsplash.com/photo-1746990263194-0e2826fed608',
    date: 'Hôm nay',
  },
];

const NewsSection: React.FC = () => {
  return (
    <Box>
      <HStack justifyContent="space-between" marginBottom="2">
        <Heading fontSize="md">Tin tức</Heading>
        <Link fontSize="sm" color="red.500">Xem tất cả →</Link>
      </HStack>
      <VStack gap={2} align="stretch">
        {newsItems.map((item) => (   
            <Box
                borderWidth="1px"
                borderRadius="sm"
                overflow="hidden"
                boxShadow="md"
                bg="white"
                display="flex"
                key={item.id}
            >       
                <Image
                    src={item.image} 
                    alt={item.title}
                    w="100px"
                    h="80px"
                    objectFit="cover"
                />
                <VStack p={1} alignItems="flex-start" justifyContent="space-between">
                    <Text fontSize="xx-small" fontWeight="bold">
                        {item.title}
                    </Text>
                    <Text fontSize="xx-small" color="gray.500">
                        {item.date}
                    </Text>
                </VStack>
            </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default NewsSection;