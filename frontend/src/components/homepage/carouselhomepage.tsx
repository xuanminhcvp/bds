import React from 'react';
import { Box, Text, Badge, Image, Flex, IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Sử dụng icon từ react-icons
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Định nghĩa kiểu dữ liệu cho dự án bất động sản
interface Project {
  image: string;
  status: string;
  title: string;
  area: string;
  location: string;
  views: number;
  imagesCount: number;
}

// Dữ liệu mẫu cho các dự án bất động sản
const projects: Project[] = [
  {
    image: 'https://via.placeholder.com/300x200?text=Vinhomes+Wonder+City',
    status: 'Đang mở bán',
    title: 'Vinhomes Wonder City',
    area: '133,44 ha',
    location: 'Đan Phượng, Hà Nội',
    views: 20,
    imagesCount: 9,
  },
  {
    image: 'https://via.placeholder.com/300x200?text=Eco+Retreat+Long+An',
    status: 'Đang cập nhật',
    title: 'Eco Retreat Long An',
    area: '21,5 ha',
    location: 'Bến Lức, Long An',
    views: 9,
    imagesCount: 7,
  },
  {
    image: 'https://via.placeholder.com/300x200?text=The+Opus+One',
    status: 'Đang mở bán - 25/2/2024: Khởi công',
    title: 'The Opus One - Vinhomes...',
    area: '2,3 ha',
    location: 'Quận 9, Hồ Chí Minh',
    views: 7,
    imagesCount: 7,
  },
  {
    image: 'https://via.placeholder.com/300x200?text=The+Crown',
    status: 'Đang mở bán',
    title: 'The Crown - Vinhomes Oce...',
    area: '294 ha',
    location: 'Vân Giang, Hưng Yên',
    views: 7,
    imagesCount: 7,
  },
];

// Cấu hình cho slider
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <IconButton aria-label="Next" icon={<FaChevronRight />} />,
  prevArrow: <IconButton aria-label="Prev" icon={<FaChevronLeft />} />,
};

const CarouselHomepage: React.FC = () => {
  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Dự án bất động sản nổi bật
        </Text>
        <Text color="red.500" cursor="pointer">
          Xem thêm →
        </Text>
      </Flex>

      <Slider {...settings}>
        {projects.map((project, index) => (
          <Box key={index} p={2}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
              <Image src={project.image} alt={project.title} />
              <Box p={4}>
                <Badge colorScheme="green" mb={2}>
                  {project.status}
                </Badge>
                <Text fontWeight="bold" fontSize="lg">
                  {project.title}
                </Text>
                <Text fontSize="sm">{project.area}</Text>
                <Text fontSize="sm" color="gray.500">
                  {project.location}
                </Text>
                <Flex mt={2} justify="space-between">
                  <Text fontSize="sm">👁️‍🗨️ {project.views}</Text>
                  <Text fontSize="sm">📷 {project.imagesCount}</Text>
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselHomepage;