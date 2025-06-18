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
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProjectResponse } from '../../types/project';
import { formatRelativeTime } from '../../utils/formatRelativeTime.ts';
import useRealEstateStore from '../../stores';

const Carousel: React.FC<{ images?: string[] }> = ({ images }) => {
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
              src={img}
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

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projectDetail, getProjectById } = useRealEstateStore();

  useEffect(() => {
    if (id) {
      getProjectById(parseInt(id, 10));
    }
  }, [id, getProjectById]);

  const project = projectDetail;

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      {/* Tiêu đề và trạng thái */}
      <Heading size="lg">{project?.title}</Heading>

      {/* Carousel hình ảnh */}
      <Box mb={6} mt={4}>
        <Carousel images={project?.images} />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Thông tin chi tiết */}
        <Box>
          <Text mb={2}>
            <strong>Diện tích:</strong> {project?.area} m²
          </Text>
          <Text mb={2}>
            <strong>Địa chỉ:</strong> {project?.address}
          </Text>
          <Text mb={2}>
            <strong>Công ty:</strong> {project?.company}
          </Text>
          <Text mb={2}>
            <strong>Ngày tạo:</strong> {formatRelativeTime(project?.created_at)}
          </Text>
          <Divider my={4} />
          <Text fontSize="md" color="gray.600">
            {project?.description}
          </Text>
        </Box>

        {/* Thông tin người đăng */}
        <Box>
          <Flex align="center" mb={4}>
            <Avatar
              src={project?.user.avatar}
              name={project?.user.name}
              size="lg"
              mr={3}
            />
            <Box>
              <Text fontWeight="bold">{project?.user.name}</Text>
              <Text color="gray.500">{project?.user.email}</Text>
              <Text color="gray.500">{project?.user.phone}</Text>
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

export default ProjectDetail;