import React from 'react';
import {
  Box,
  Heading,
  Image,
  IconButton,
  chakra,
  useBreakpointValue,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CompanyItem {
  id: number;
  name: string;
  logo: string;
}

const companyData: CompanyItem[] = [
  {
    id: 1,
    name: 'Kim Tinh Group',
    logo: 'http://localhost:8000/assets/dn/dn1.jpg',
  },
  {
    id: 2,
    name: 'Cát Tường Group',
    logo: 'http://localhost:8000/assets/dn/dn2.jpg',
  },
  {
    id: 3,
    name: 'SP Home',
    logo: 'http://localhost:8000/assets/dn/dn3.jpg',
  },
  {
    id: 4,
    name: 'Đức Hùng Land',
    logo: 'http://localhost:8000/assets/dn/dn4.jpg',
  },
  {
    id: 5,
    name: 'Kim Oanh Group',
    logo: 'http://localhost:8000/assets/dn/dn5.jpg',
  },
  {
    id: 6,
    name: 'Sea Holdings',
    logo: 'http://localhost:8000/assets/dn/dn6.jpg',
  },
  {
    id: 7,
    name: 'Hưng Thịnh Land',
    logo: 'http://localhost:8000/assets/dn/dn7.jpg',
  },
  {
    id: 8,
    name: 'Novaland',
    logo: 'http://localhost:8000/assets/dn/dn8.jpg',
  },
];

const ArrowBtn = ({
  isLeft,
  onClick,
}: {
  isLeft?: boolean;
  onClick?: () => void;
}) => (
  <IconButton
    aria-label={isLeft ? 'Prev' : 'Next'}
    icon={isLeft ? <FaChevronLeft /> : <FaChevronRight />}
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    left={isLeft ? 2 : undefined}
    right={isLeft ? undefined : 2}
    size="sm"
    variant="ghost"
    onClick={onClick}
    _focus={{ boxShadow: 'none' }}
  />
);

const FeaturedCompanies: React.FC = () => {
  const sliderRef = React.useRef<Slider>(null);
  const slidesToShow = useBreakpointValue({ base: 2, md: 4, lg: 6 }) ?? 4;

  const settings = {
    slidesToShow,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    arrows: false,
  };

  return (
    <Box px={4} py={6} position="relative" mt={8}>
      <Heading as="h2" size="lg" mb={4}>
        Doanh nghiệp tiêu biểu
      </Heading>

      <chakra.div overflow="hidden" pl="40px" pr="40px" position="relative" mt={8}>
        <ArrowBtn isLeft onClick={() => sliderRef.current?.slickPrev()} />
        <ArrowBtn onClick={() => sliderRef.current?.slickNext()} />

        <Slider ref={sliderRef} {...settings}>
          {companyData.map((item) => (
            <Box key={item.id} px={2}>
              {/* Box đóng vai trò “group” để hover vào đâu cũng lên màu */}
              <Box
                role="group"
                bg="white"
                boxShadow="md"
                borderRadius="md"
                width="150px"
                height="100px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  objectFit="contain"
                  maxW="100%"
                  maxH="100%"
                  filter="grayscale(100%)"
                  transition="filter 0.3s"
                  /* khi hover nhóm hoặc ảnh thì bỏ grayscale */
                  _groupHover={{ filter: 'grayscale(0%)' }}
                  _hover={{ filter: 'grayscale(0%)' }}
                />
              </Box>
            </Box>
          ))}
        </Slider>
      </chakra.div>
    </Box>
  );
};

export default FeaturedCompanies;