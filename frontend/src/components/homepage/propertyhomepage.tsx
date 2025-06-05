import { Box, Flex, Image, Text, HStack, IconButton, SimpleGrid } from '@chakra-ui/react';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

interface PropertyItem {
  id: number;
  title: string;
  price: string;
  image: string;
  location: string;
  time: string;
}

const properties: PropertyItem[] = [
  {
    id: 1,
    title: 'Khái Trương Căn Hộ 1 Phòng Ngũ Cao Cấp',
    price: '10.5 triệu/tháng - 40 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng 2 ngày trước',
  },
  {
    id: 2,
    title: 'Chuyên Cho Thuê Căn Hộ Cao Cấp 2PN, Nội Thất Đầy Đủ',
    price: '9.9 triệu/tháng - 55 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng hôm qua',
  },
  {
    id: 3,
    title: 'Cho Thuê CHDV 1PN Gần Căn Thị Nghè, Nguyễn Cư Văn Bỉnh...',
    price: '8.2 triệu/tháng - 30 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng 5 ngày trước',
  },
  {
    id: 4,
    title: 'Studio Cửa Sổ Lớn Ngày Cửa Thị Nghè, Bình Thạnh',
    price: '9 triệu/tháng - 30 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng 5 ngày trước',
  },
  {
    id: 5,
    title: 'Căn Hộ 1PN + Bancony Hẻm An Ninh Gần Ngã...',
    price: '9.9 triệu/tháng - 50 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng 2 ngày trước',
  },
  {
    id: 6,
    title: 'Căn Hộ Duplex, Tiện Dụ Cư Quán Trung Tâm, Khánh...',
    price: '7 triệu/tháng - 40 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng 2 ngày trước',
  },
  {
    id: 7,
    title: 'Khái Trương Căn Hộ 2PN - 1PN Ngã Nguyễn Cư Văn Bỉnh...',
    price: '8.5 triệu/tháng - 52 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng 5 ngày trước',
  },
  {
    id: 8,
    title: 'CHDV 1PN+1PB Tách Biệt 45m² + Full NT MG Rẻ-Ngày Hàng...',
    price: '7 triệu/tháng - 45 m²',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    location: 'Bình Thạnh, Hồ Chí Minh',
    time: 'Đăng 5 ngày trước',
  },
];

const PropertyList = () => {
  return (
    <Box p={4}>
      {/* Tiêu đề */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Bất động sản đang cho thuê
        </Text>
      </Flex>

      {/* Danh sách bất động sản dạng lưới */}
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
        {properties.map((property) => (
          <Box
            key={property.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image src={property.image} alt={property.title} />
            <Box p={4}>
              <Text
                fontWeight="bold"
                noOfLines={2} // Thay thế lineClamp bằng noOfLines
              >
                {property.title}
              </Text>
              <Text color="red.500" fontSize="lg" mb={2}>
                {property.price}
              </Text>
              <HStack gap={1}>
                <FaMapMarkerAlt color="gray" size="14px" />
                <Text fontSize="sm" color="gray.600">
                  {property.location}
                </Text>
              </HStack>
              <HStack justify="space-between" mt={2}>
                <Text fontSize="xs" color="gray.500">
                  {property.time}
                </Text>
                <IconButton
                  aria-label="Thêm vào yêu thích"
                  variant="ghost"
                  size="sm"
                  colorScheme="red"
                  icon={<FaHeart />}
                />
              </HStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PropertyList;