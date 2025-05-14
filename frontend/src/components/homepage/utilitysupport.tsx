import React from 'react';
import { Box, Heading, Icon, Text, Grid, GridItem } from '@chakra-ui/react';
import { FaYinYang, FaHome, FaCalculator, FaSun } from 'react-icons/fa';

// Define the type for each utility item
interface UtilityItem {
  id: number;
  title: string;
  icon: React.ElementType;
  color: string;
}

// Sample data based on the image
const utilityData: UtilityItem[] = [
  { id: 1, title: 'Xem tử vi hôm nay', icon: FaYinYang, color: 'teal.500' },
  { id: 2, title: 'Chi phí xây nhà', icon: FaHome, color: 'orange.500' },
  { id: 3, title: 'Tính lãi suất', icon: FaCalculator, color: 'purple.500' },
  { id: 4, title: 'Tư vấn phong thủy', icon: FaSun, color: 'yellow.500' },
];

const UtilitySupport: React.FC = () => {
  return (
    <Box p={4}>
      {/* Heading */}
      <Heading as="h2" size="lg" mb={4}>
        Hỗ trợ tiện ích
      </Heading>

      {/* Utility Cards */}
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        {utilityData.map((item) => (
          <GridItem
            key={item.id}
            p={4}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            textAlign="center"
            _hover={{ bg: 'gray.50' }}
          >
            <Icon as={item.icon} w={12} h={12} color={item.color} mb={2} />
            <Text fontSize="md" fontWeight="medium">
              {item.title}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default UtilitySupport;