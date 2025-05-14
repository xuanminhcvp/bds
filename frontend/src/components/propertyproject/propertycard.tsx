import React from 'react';
import { Box, Heading, Image, Text, Flex, Badge } from '@chakra-ui/react';
import { projectData } from "./data.ts"


const PropertyCard: React.FC = () => {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="md" color="gray.700">
          Đang mở bán
        </Heading>
      </Flex>
      {projectData.map((item) => (
        <Flex key={item.id} direction={{ base: 'column', md: 'row' }} gap={4} p={4} borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm">
          <Box flexShrink={0}>
            <Image
              src={item.image}
              alt={item.title}
              objectFit="cover"
              w={{ base: '100%', md: '300px' }}
              h={{ base: '200px', md: '200px' }}
              borderRadius="md"
            />
          </Box>
          <Box p={4}>
            <Badge colorScheme="green" mb={2}>
              Đang mở bán
            </Badge>
            <Text fontWeight="bold" fontSize="md" color="gray.800" mb={2}>
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              Diện tích: {item.area}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              Vị trí: {item.location}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {item.description}
            </Text>
            <Flex align="center" color="gray.500" fontSize="sm">
              <Text mr={2}>Lượt xem:</Text>
              <Text fontWeight="bold">{item.views}</Text>
            </Flex>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default PropertyCard;