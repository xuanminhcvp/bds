import React from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

// Define the type for a company
interface Company {
  name: string;
  logo: string;
}

// Define the type for a broker
interface Broker {
  name: string;
  contact: string;
  image: string;
}

// Sample data for companies and brokers
const companies: Company[] = [
  { name: 'Bất động sản dự án - DP GOUR', logo: 'https://file4.batdongsan.com.vn/resize/200x200/2019/11/18/3ZsSL6gy/20191118151335-0aea.jpg' },
  { name: 'Công ty cổ phần bất động sản Bắc PS', logo: 'https://file4.batdongsan.com.vn/resize/200x200/2019/11/18/3ZsSL6gy/20191118151335-0aea.jpg' },
  { name: 'Công ty cổ phần bất động sản CT', logo: 'https://file4.batdongsan.com.vn/resize/200x200/2019/11/18/3ZsSL6gy/20191118151335-0aea.jpg' },
];

const brokers: Broker[] = [
  { name: 'Lý Minh Châu', contact: '0862594780', image: 'https://file4.batdongsan.com.vn/resize/200x200/2019/11/18/3ZsSL6gy/20191118151335-0aea.jpg' },
  { name: 'Tạ Hữu Huy', contact: '0987666398', image: 'https://file4.batdongsan.com.vn/resize/200x200/2019/11/18/3ZsSL6gy/20191118151335-0aea.jpg' },
  { name: 'Hoàng Phúc', contact: '0948032255', image: 'https://file4.batdongsan.com.vn/resize/200x200/2019/11/18/3ZsSL6gy/20191118151335-0aea.jpg' },
];

// FeaturedBrokers component
const FeaturedBrokers: React.FC = () => {
  return (
    <Box p={5} maxW="300px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading */}
      <Heading as="h2" size="md" mb={6}>
        Nhà môi giới tiêu biểu
      </Heading>

      {/* Companies Section */}
      <Box mb={6}>
        <Flex alignItems="center" mb={4}>
          <Image src={companies[0].logo} alt={companies[0].name} boxSize="50px" mr={4} />
          <Text fontSize="sm">{companies[0].name}</Text>
        </Flex>
        <Flex alignItems="center" mb={4}>
          <Image src={companies[1].logo} alt={companies[1].name} boxSize="50px" mr={4} />
          <Text fontSize="sm">{companies[1].name}</Text>
        </Flex>
        <Flex alignItems="center" mb={4}>
          <Image src={companies[2].logo} alt={companies[2].name} boxSize="50px" mr={4} />
          <Text fontSize="sm">{companies[2].name}</Text>
        </Flex>
      </Box>

      {/* Brokers Section */}
      <Box>
        {brokers.map((broker, index) => (
          <Flex key={index} alignItems="center" mb={4}>
            <Image
              src={broker.image}
              alt={broker.name}
              boxSize="50px"
              borderRadius="md"
              mr={4}
            />
            <Box>
              <Text fontSize="sm" fontWeight="medium">{broker.name}</Text>
              <Text fontSize="sm" color="gray.500">{broker.contact}</Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedBrokers;