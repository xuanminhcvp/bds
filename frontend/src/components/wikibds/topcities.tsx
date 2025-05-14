import React from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

// Define the type for a province/city
interface Province {
  name: string;
  image: string;
}

// Sample data for provinces/cities
const provinces: Province[] = [
  { name: 'Bà Rịa - Vũng Tàu', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Bình Dương', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Đà Nẵng', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Đồng Nai', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Hải Phòng', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Hưng Yên', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Khánh Hòa', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Long An', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Quảng Nam', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
  { name: 'Quảng Ninh', image: 'https://www.homepaylater.vn/static/c385e533c4ae6fd0082321567fe11053/89314/1_ho_hoan_kiem_nam_ngay_trung_tam_ha_noi_va_la_mot_bieu_tuong_cua_thanh_pho_2612ef4c2f.webp' },
];

// TopCities component
const TopCities: React.FC = () => {
  return (
    <Box p={5} maxW="300px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={6}>
        Thị trường BDS tại 10 tỉnh / thành phố lớn
      </Heading>

      {/* List of Provinces/Cities */}
      <Flex direction="column" gap={4}>
        {provinces.map((province, index) => (
          <Flex key={index} alignItems="center">
            <Image
              src={province.image}
              alt={province.name}
              boxSize="50px"
              borderRadius="md"
              mr={4}
            />
            <Text fontSize="md" fontWeight="medium">
              {province.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default TopCities;