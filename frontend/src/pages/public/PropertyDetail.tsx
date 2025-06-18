import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Divider,
  SimpleGrid,
  Avatar,
  Button,
  HStack,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Property } from '../../stores/type/PropertyType';
import { formatPrice } from '../../utils/formatPrice.ts';
import { formatRelativeTime } from '../../utils/formatRelativeTime.ts';
import useRealEstateStore from '../../stores';
import AreaSidebar from '../../components/sidebar/AreaSidebar.tsx';


const Carousel: React.FC<{ images?: Property['images'] }> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box>
      <Slider {...settings}>
        {images && images.map((img, index) => (
          <Box key={index}>
            <Image
              src={img.image_url}
              alt={`Hình ${index + 1}`}
              objectFit="cover"
              w="100%"
              h="400px"
              borderRadius="md"
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { propertyDetail, getPropertyById } = useRealEstateStore();

    useEffect(() => {
        if (id) {
            getPropertyById(parseInt(id, 10));
        }
    }, [id, getPropertyById]);

    const property = propertyDetail

    return (
        <Box maxW="1200px" mx="auto" p={4}>
            {/* Tiêu đề và trạng thái */}
            <HStack></HStack>
            <Heading size="lg">{propertyDetail?.title}</Heading>
            
            {/* Carousel hình ảnh */}
            <Box mb={6} mt={4}>
                <Carousel images={property?.images} />
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Thông tin chi tiết */}
                <Box>
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {property?.price ? formatPrice(property?.price ?? 0) : 'Giá thỏa thuận'}
                </Text>
                <Text mb={2}>
                    <strong>Diện tích:</strong> {property?.area} m²
                </Text>
                <Text mb={2}>
                    <strong>Địa chỉ:</strong> {property?.address}
                </Text>
                <Text mb={2}>
                    <strong>Phòng ngủ:</strong> {property?.bedrooms}
                </Text>
                <Text mb={2}>
                    <strong>Phòng tắm:</strong> {property?.bathrooms}
                </Text>
                <Text mb={2}>
                    <strong>Loại:</strong>{' '}
                    {property?.property_type === 'sale' ? 'Bán' : 'Thuê'}
                </Text>
                <Text mb={2}>
                    <strong>Danh mục:</strong>{' '}
                    {property?.category === 'apartment' ? 'Căn hộ' : 'Nhà ở'}
                </Text>
                <Text mb={2}>
                    <strong>Lượt xem:</strong> {property?.views}
                </Text>
                <Text mb={2}>
                    <strong>Ngày đăng:</strong> {formatRelativeTime(property?.created_at)}
                </Text>
                <Divider my={4} />
                <Text fontSize="md" color="gray.600">
                    {property?.description}
                </Text>
                </Box>

                {/* Thông tin người đăng */}
                <Box>
                <Flex align="center" mb={4}>
                    <Avatar
                        src={property?.user.avatar}
                        name={property?.user.name}
                        size="lg"
                        mr={3}
                    />
                    <Box>
                        <Text fontWeight="bold">{property?.user.name}</Text>
                        <Text color="gray.500">{property?.user.email}</Text>
                        <Text color="gray.500">{property?.user.phone}</Text>
                    </Box>
                </Flex>
                <Button colorScheme="teal" w="full">
                    Liên hệ ngay
                </Button>
                </Box>
            </SimpleGrid>
        </Box>
    );
    };

export default PropertyDetail;