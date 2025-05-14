import React from 'react';
import { Box, Heading, Flex, Image, Text, Button, VStack } from '@chakra-ui/react';
import { newsData } from './data';


const NewsSection: React.FC = () => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="md" color="gray.700">
          Tin tức
        </Heading>
        <Button
          color="red.500"
          size="sm"
          _hover={{ textDecoration: 'underline' }}
        >
          Xem tất cả
        </Button>
      </Flex>
      <VStack gap={4} align="stretch">
        {newsData.map((item) => (
          <Flex key={item.id} direction={{ base: 'column', md: 'row' }} align="start" gap={4}>
            <Box flexShrink={0}>
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                w={{ base: '100%', md: '150px' }}
                h={{ base: '100px', md: '100px' }}
                borderRadius="md"
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" fontSize="md" color="gray.800" mb={2}>
                {item.title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {item.description}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default NewsSection;