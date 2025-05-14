import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';

// Define the type for a province/city
interface Province {
  name: string;
  count: number;
}

// Sample data for provinces/cities
const provinces: Province[] = [
  { name: 'Hồ Chí Minh', count: 2860 },
  { name: 'Hà Nội', count: 1796 },
  { name: 'Đà Nẵng', count: 282 },
  { name: 'Bình Dương', count: 375 },
  { name: 'Đồng Nai', count: 278 },
  { name: 'Khánh Hòa', count: 183 },
  { name: 'Hải Phòng', count: 56 },
  { name: 'Long An', count: 105 },
  { name: 'Quảng Nam', count: 58 },
  { name: 'Bà Rịa Vũng Tàu', count: 147 },
  { name: 'Đắk Lắk', count: 9 },
  { name: 'Cần Thơ', count: 22 },
  { name: 'Bình Thuận', count: 55 },
  { name: 'Lâm Đồng', count: 53 },
  { name: 'Thừa Thiên Huế', count: 3 },
];

// ByProvince component
const ByProvince: React.FC = () => {
  return (
    <Box p={5} maxW="300px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={6}>
        Theo tỉnh / thành phố
      </Heading>

      {/* List of Provinces/Cities */}
      <Box mb={4}>
        {provinces.map((province, index) => (
          <Text key={index} fontSize="sm" mb={1}>
            • {province.name} ({province.count})
          </Text>
        ))}
      </Box>

      {/* See More Link */}
      <Link color="red.500" fontSize="sm" href="#" display="flex" alignItems="center">
        Xem thêm
        <Text ml={1}>▼</Text>
      </Link>
    </Box>
  );
};

export default ByProvince;