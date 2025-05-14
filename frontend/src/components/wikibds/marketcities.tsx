import React from 'react';
import { Box, Grid, Heading, Image, Text } from '@chakra-ui/react';

// Define the type for a city
interface City {
  name: string;
  image: string;
}

// Sample data for cities
const cities: City[] = [
  { name: 'Hà Nội', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Hồ Chí Minh', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
];

// MarketCities component
const MarketCities: React.FC = () => {
  return (
    <Box p={5} maxW="600px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={6}>
        Thị trường BDS tại các thành phố đông nhất
      </Heading>

      {/* Grid of City Cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        {cities.map((city, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image src={city.image} alt={city.name} />
            <Box p={4} textAlign="center">
              <Text fontSize="lg" fontWeight="bold">
                {city.name}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketCities;