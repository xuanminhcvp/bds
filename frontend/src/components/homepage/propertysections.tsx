import React from 'react';
import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react';

// Define the type for each section item
interface SectionItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Sample data based on the image
const sectionData: SectionItem[] = [
  {
    id: 1,
    title: 'Bất động sản bán',
    description: 'Bạn có thể tìm thấy những căn nhà mơ ước, nhà đất, căn hộ chung cư, biệt thự, nhà phố, shophouse, đất nền BDS tại đây.',
    icon: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/ForSale.svg',
  },
  {
    id: 2,
    title: 'Bất động sản cho thuê',
    description: 'Cập nhật thông tin về căn hộ chung cư, nhà cho thuê, văn phòng, kho xưởng, nhà mặt phố, đất nền cho thuê tại đây.',
    icon: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/ForSale.svg',
  },
  {
    id: 3,
    title: 'Dành riêng cho bạn',
    description: 'Các video dành riêng cho bạn đang cập nhật từng ngày, nhà đất giá rẻ, căn hộ chung cư, nhà phố tại Nam, Sài Gòn, Đà Nẵng...',
    icon: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/ForSale.svg',
  },
  {
    id: 4,
    title: 'Wiki BDS',
    description: 'Ngoại cập nhật những bài đăng, thủ tục, thông tin về mua bán, cho thuê, vay mua nhà, phong thủy, thiết kế nội thất, mẹo tìm căn hộ đẹp.',
    icon: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/ForSale.svg',
  },
];

const PropertySections: React.FC = () => {
  return (
    <Box p={4}>

      {/* Section Grid */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
        gap={4}
      >
        {sectionData.map((item) => (
          <GridItem
            key={item.id}
            p={4}
            bg="white"
            textAlign="center"
            _hover={{ bg: 'gray.50' }}
          >
            <Image src={item.icon} alt={item.title} boxSize="50px" mb={2} mx="auto" />
            <Text fontSize="md" fontWeight="bold" mb={2}>
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {item.description}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertySections;