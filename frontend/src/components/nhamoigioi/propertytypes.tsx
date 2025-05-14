import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

// Define the type for a property item
interface PropertyItem {
  name: string;
  count: number;
}

// Define the type for a category
interface Category {
  title: string;
  total: number;
  items: PropertyItem[];
}

// Sample data for property types
const categories: Category[] = [
  {
    title: 'Nhà đất bán',
    total: 6080,
    items: [
      { name: 'Bán đất nền dự án', count: 2161 },
      { name: 'Bán nhà riêng', count: 1574 },
      { name: 'Bán trang trại, khu nghỉ dưỡng', count: 89 },
      { name: 'Bán kho, nhà xưởng', count: 76 },
      { name: 'Bán lô đất nền thương mại', count: 105 },
      { name: 'Bán nhà mặt phố', count: 1341 },
      { name: 'Bán đất (1936)', count: 1936 },
      { name: 'Bán căn hộ chung cư', count: 2909 },
      { name: 'Bán nhà biệt thự, liền kề', count: 1096 },
      { name: 'Bán condotel', count: 10 },
      { name: 'Bán shophouse, nhà phố thương mại', count: 57 },
    ],
  },
  {
    title: 'Nhà đất cho thuê',
    total: 1029,
    items: [
      { name: 'Cho thuê căn hộ chung cư', count: 528 },
      { name: 'Cho thuê văn phòng', count: 190 },
      { name: 'Cho thuê nhà mặt phố', count: 215 },
      { name: 'Cho thuê nhà riêng', count: 218 },
      { name: 'Cho thuê kho, nhà xưởng, đất', count: 82 },
      { name: 'Cho thuê biệt thự, liền kề', count: 33 },
      { name: 'Cho thuê lô đất nền thương mại', count: 23 },
      { name: 'Cho thuê nhà trọ, phòng trọ', count: 47 },
      { name: 'Cho thuê shophouse, nhà phố thương mại', count: 7 },
      { name: 'Cho thuê nhà biệt thự, liền kề', count: 8 },
    ],
  },
];

// PropertyTypes component
const PropertyTypes: React.FC = () => {
  return (
    <Box p={5} maxW="600px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={6}>
        Theo loại BDS
      </Heading>

      {/* Two-Column Layout */}
      <Flex gap={6} direction={{ base: 'column', md: 'row' }}>
        {categories.map((category, index) => (
          <Box key={index} flex={1}>
            <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>
              {category.title} ({category.total})
            </Text>
            {category.items.map((item, idx) => (
              <Text key={idx} fontSize="sm" mb={1}>
                • {item.name} ({item.count})
              </Text>
            ))}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PropertyTypes;