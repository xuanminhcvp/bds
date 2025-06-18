import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Image, Button, Flex, HStack, IconButton } from '@chakra-ui/react';
import { MdOutlineAccessTime, MdFavorite, MdFavoriteBorder, MdOutlinePriceChange, MdOutlineSquareFoot, MdOutlineLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; 
import { Property } from '../../stores/type/PropertyType.ts';
import useRealEstateStore from '../../stores';
import { Icon } from "@chakra-ui/react"
import { CiImageOn, CiLocationOn  } from "react-icons/ci";
import { filter } from 'lodash';
import { formatPrice } from '../../utils/formatPrice.ts';
import { addFavoriteAPI, removeFavoriteAPI } from '../../stores/services/favoriteService.ts';
import { toast } from 'sonner';

function formatRelativeTime(dateString: any) {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffInTime = now.getTime() - createdDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  if (diffInDays === 0) {
    return "đăng hôm nay";
  } else if (diffInDays === 1) {
    return "đăng hôm qua";
  } else if (diffInDays >= 2 && diffInDays <= 7) {
    return `đăng ${diffInDays} ngày trước`;
  } else {
    const day = createdDate.getDate();
    const month = createdDate.getMonth() + 1; 
    return `đăng ${day}/${month}`;
  }
}

const FeaturedProperty = () => {
  const { property, filterProperty, fetchProperty, clearFilterProperty } = useRealEstateStore();
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [propertyIdFavorite, setPropertyIdFavorite ] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      clearFilterProperty();
      console.log('filterProperty', filterProperty);
      await fetchProperty(filterProperty);
    };
    fetchData();
  }, [fetchProperty]);

  useEffect(() => {
    const filtered = property
      .sort(
        (a, b) => (b.views ?? 0) - (a.views ?? 0)
      )
      .slice(0, 8);
    setFiltered(filtered);
  }, [property, fetchProperty]);

  const toggleFavorite = async (propertyId: number, currentFavorite: boolean) => {
    try {
      if (currentFavorite) {
        console.log('Removing favorite for property ID:', propertyId);
        await removeFavoriteAPI(propertyId);
        toast.success('Đã bỏ yêu thích bất động sản');
      } else {
        console.log('Adding favorite for property ID:', propertyId);
        await addFavoriteAPI(propertyId);
        toast.success('Đã thêm yêu thích bất động sản');
      }
      setFiltered(filtered.map(item =>
        item.property_id === propertyId ? { ...item, is_favorited: !currentFavorite } : item
      ));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={6} mt={6}>
        <Heading as="h2" size="lg">Bất Động Sản Nổi Bật</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/nhadatban')} size="md">
          Xem tất cả
        </Button>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          {filtered.map((item) => (
          <Box key={item.property_id} borderRadius="md" boxShadow="md" bg="white">
            <Box position="relative">
              <Flex 
                gap={1} 
                w="100%" 
                h="150px" 
                onClick={() => navigate(`/property/${item.property_id}`)}
                cursor="pointer"
              >
                {/* Ảnh lớn bên trái */}
                <Box flex="3" h="100%">
                  <Image
                    src={item.images[0]?.image_url || ''}
                    alt={item.title}
                    h="100%"
                    w="100%"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Box>
                {/* Hai ảnh nhỏ bên phải */}
                <Flex flex="1" direction="column" gap={1} h="100%">
                  <Image
                    src={item.images[1]?.image_url || ''}
                    alt={item.title}
                    h="50%"
                    w="100%"
                    objectFit="cover"
                    borderRadius="md"
                    
                  />
                  <Image
                    src={item.images[2]?.image_url || ''}
                    alt={item.title}
                    h="50%"
                    w="100%"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Flex>
              </Flex>
              <Flex
                position="absolute"
                bottom={2}
                right={2}
                align="center"
                color="black"
                bg="whiteAlpha.800"
                borderRadius="full"
                px={2}
              >
                <Icon as={CiImageOn} boxSize={4}  />
                <Text fontSize="xs">
                  {item.images.length}
                </Text>
              </Flex>
            </Box>  
            <Box p={4}>
        <Flex justify="space-between" align="center" mb={1}>
          <Flex align="center" color="gray.600" fontSize="sm">
            <Icon as={MdOutlineAccessTime} boxSize={4} />
            <Text fontSize="sm" ml={1.5}>
              {formatRelativeTime(item.created_at)}
            </Text>
          </Flex>
          <IconButton
              aria-label="Toggle favorite"
              icon={item.is_favorited ? <MdFavorite /> : <MdFavoriteBorder />}
              color={item.is_favorited ? 'red.500' : 'gray.400'}
              size="sm"
              variant="ghost"
              onClick={() => toggleFavorite(item.property_id, item.is_favorited ?? false)}
          />
        </Flex>
        <Text
          fontWeight="semibold"
          fontSize="xl"
          noOfLines={1}
          textOverflow="ellipsis"
          color="blue.700"
          _hover={{ color: 'blue.900' }}
          onClick={() => navigate(`/property/${item.property_id}`)}
          cursor="pointer"
        >
          {item.title}
        </Text>
        <Text fontSize="md" color="gray.700" noOfLines={1} mt={1}>
          <Icon as={MdOutlinePriceChange} boxSize={4} mr={1.5} verticalAlign="middle" />
          Giá: {formatPrice(item.price)}
        </Text>
        <Text fontSize="md" color="gray.700" noOfLines={1} mt={1}>
          <Icon as={MdOutlineSquareFoot} boxSize={4} mr={1.5} verticalAlign="middle" />
          Diện tích: {item.area} m²
        </Text>
        <Text fontSize="md" color="gray.700" noOfLines={2} mt={1}>
          <Icon as={MdOutlineLocationOn} boxSize={4} mr={1.5} verticalAlign="middle" />
          Địa chỉ: {item.address}
        </Text>
      </Box>
          </Box>
        ))}
      </SimpleGrid>
      
    </Box>
  );
};

export default FeaturedProperty;