import React from 'react';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

const markets = [
    { name: 'Bà Rịa - Vũng Tàu', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Bình Dương', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Đà Nẵng', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Đồng Nai', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Hải Phòng', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Hưng Yên', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Khánh Hòa', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Long An', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Quảng Nam', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
    { name: 'Quảng Ninh', image: 'https://images.unsplash.com/photo-1745512751454-710500481a82' },
];

const Tenbds = () => {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        maxW="sm"
        boxShadow="md"
        margin={"6"}
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Thị trường BĐS tại 10 tỉnh / thành phố lớn
        </Text>
  
        <VStack gap={3} align="start">
          {markets.map((market, index) => (
            <Flex key={index} align="center">
              <Image
                src={market.image}
                alt={market.name}
                boxSize="50px"
                borderRadius="md"
                mr={3}
              />
              <Text fontSize="md">{market.name}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    );
  };

export default Tenbds;