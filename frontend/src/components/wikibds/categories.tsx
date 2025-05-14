import React from 'react';
import { Box, Grid, Heading, Text, Image } from '@chakra-ui/react';

// Define the type for a category
interface Category {
  label: string;
  icon: string; // Placeholder for icon URL
}

// Sample data for categories
const categories: Category[] = [
  { label: 'Mua BDS', icon: 'https://cdn-icons-png.flaticon.com/512/13083/13083501.png' },
  { label: 'Bán BDS', icon: 'https://cdn-icons-png.flaticon.com/512/13083/13083501.png' },
  { label: 'Thuê BDS', icon: 'https://cdn-icons-png.flaticon.com/512/13083/13083501.png' },
  { label: 'Tài chính BDS', icon: 'https://cdn-icons-png.flaticon.com/512/13083/13083501.png' },
  { label: 'Quy hoạch - Pháp lý', icon: 'https://cdn-icons-png.flaticon.com/512/13083/13083501.png' },
  { label: 'Nội - Ngoại thất', icon: 'https://cdn-icons-png.flaticon.com/512/13083/13083501.png' },
  { label: 'Phong thủy', icon: 'https://cdn-icons-png.flaticon.com/512/13083/13083501.png' },
];

// Categories component
const Categories: React.FC = () => {
  return (
    <Box p={5} maxW="1200px" mx="auto">
      {/* Heading */}
      <Heading as="h2" size="lg" mb={6}>
        Chuyên mục
      </Heading>

      {/* Grid of Categories */}
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
        {categories.map((category, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
            bg="white"
            boxShadow="sm"
          >
            <Image
              src={category.icon}
              alt={category.label}
              boxSize="50px"
              mx="auto"
              mb={3}
              borderRadius="full"
              bg="red.50"
            />
            <Text fontSize="sm" fontWeight="medium">
              {category.label}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;