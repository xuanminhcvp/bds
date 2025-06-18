import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Image, Button, Flex, Icon, HStack, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useRealEstateStore from '../../stores';
import { Project } from '../../types/project';
import { CiImageOn } from 'react-icons/ci';
import { MdOutlineAccessTime, MdFavorite, MdFavoriteBorder, MdOutlineBusiness, MdOutlineSquareFoot, MdOutlineLocationOn } from "react-icons/md";
import { formatPrice } from '../../utils/formatPrice';

function formatRelativeTime(dateString: string) {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffInTime = now.getTime() - createdDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  if (diffInDays === 0) {
    return 'đăng hôm nay';
  } else if (diffInDays === 1) {
    return 'đăng hôm qua';
  } else if (diffInDays >= 2 && diffInDays <= 7) {
    return `đăng ${diffInDays} ngày trước`;
  } else {
    const day = createdDate.getDate();
    const month = createdDate.getMonth() + 1;
    return `đăng ${day}/${month}`;
  }
}

const FeaturedProject = () => {
  const { projects, fetchProjects } = useRealEstateStore();
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Có thể thêm logic để lưu trạng thái yêu thích vào backend
  };
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const filtered = projects
      // .filter((project) => project.status === 'active' && new Date(project.expires_at) > new Date())
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 8);
    setFiltered(filtered);
  }, [projects]);

  return (
    <Box mt={16}>
      <HStack justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="lg">Dự Án Nổi Bật</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/duan')}>
            Xem tất cả
        </Button>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
        {filtered.map((item) => (
          <Box key={item.project_id} borderRadius="md" boxShadow="md" bg="white">
            <Box position="relative">
              <Flex 
                gap={1} 
                w="100%" 
                h="150px" 
                onClick={() => navigate(`/project/${item.project_id}`)}
                cursor="pointer"
              >
                {/* Ảnh lớn bên trái */}
                <Box flex="3" h="100%">
                  <Image
                    src={item.images[0] || ''}
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
                    src={item.images[1] || ''}
                    alt={item.title}
                    h="50%"
                    w="100%"
                    objectFit="cover"
                    borderRadius="md"
                    
                  />
                  <Image
                    src={item.images[2] || ''}
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
                <Icon as={CiImageOn} boxSize={4} />
                <Text fontSize="xs">{item.images.length}</Text>
              </Flex>
            </Box>
            <Box p={4}>
        <Flex justify="space-between" align="center">
          <Flex align="center" color="gray.600" fontSize="sm">
            <Icon as={MdOutlineAccessTime} boxSize={4} />
            <Text fontSize="sm" ml={1.5}>
              {formatRelativeTime(item.created_at)}
            </Text>
          </Flex>
          <IconButton
            aria-label="Toggle favorite"
            icon={isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
            color={isFavorite ? 'red.500' : 'gray.400'}
            size="sm"
            variant="ghost"
            onClick={toggleFavorite}
          />
        </Flex>
        <Text
          fontWeight="semibold"
          fontSize="xl"
          noOfLines={1}
          textOverflow="ellipsis"
          color="blue.700"
          _hover={{ color: 'blue.900' }}
          onClick={() => navigate(`/project/${item.project_id}`)}
          cursor="pointer"
        >
          {item.title}
        </Text>
        <Text fontSize="md" color="gray.700" noOfLines={1} mt={1}>
          <Icon as={MdOutlineBusiness} boxSize={4} mr={1.5} verticalAlign="middle" />
          Công ty: {item.company}
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
      <Box textAlign="center" mt={6}>
        
      </Box>
    </Box>
  );
};

export default FeaturedProject;