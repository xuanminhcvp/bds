import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';

interface DuAnCardProps {
  title: string;
  area: string;
  address: string;
  description: string;
  company: string;
  images: string[];
  status: string;
}

const DuAnCard: React.FC<DuAnCardProps> = ({
  title,
  area,
  address,
  description,
  company,
  images,
  status,
}) => {
  const largeImage = images[0];
  const thumbnails = images.slice(1, 3);
  return (
    <Box
      borderWidth="1px"
      borderRadius="sm"
      overflow="hidden"
      boxShadow="md"
      w="660px"
      h="240px"
      maxW="660px"
      bg="white"
      display="flex"
    >
      <VStack gap={1} w="240px" h="240px">
        <Image
          src={largeImage}
          alt="Hinh anh du an"
          w="240px"
          h="160px"
          objectFit="cover"
        />
        <HStack gap={1} w="240px" h="80px">
          {thumbnails.map((thumb, index) => (
            <Image
              key={index}
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              w="118px"
              h="80px"
              objectFit="cover"
            />
          ))}          
        </HStack>
      </VStack>
      <Box p={4} flex="1" overflowY="auto">
        <Badge borderRadius="full" px="2" colorScheme="teal" fontSize="xs">
          {status}
        </Badge>
        <Text fontSize="md" fontWeight="bold" mt={2}>
          {title}
        </Text>
        <Text fontSize="xs" mt={1}>{area} ha</Text>
        <Text fontSize="xs" mt={1}>
          {address}
        </Text>
        <Text fontSize="xs" mt={1}>
          {description}
        </Text>
        <HStack mt={2}>
          <Text fontSize="xs" color="gray.500">
            📸
          </Text>
          <Text fontSize="xs" color="gray.500">
            {company}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default DuAnCard;