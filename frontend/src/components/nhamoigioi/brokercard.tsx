import React from 'react';
import { Box, Flex, Heading, Text, Image, Button } from '@chakra-ui/react';

// Define the type for a brokerage area
interface Area {
  name: string;
}

// Sample data
const company = {
  name: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN BẤT ĐỘNG SẢN VICTORY REAL',
  logo: 'https://file4.batdongsan.com.vn/resize/200x200/2025/04/17/20250417151928-ec5c.jpg',
  address: '8-10, Nguyễn Bá Tuyên, 12, Tân Bình, Hồ Chí Minh, Việt Nam',
  phone: '0989199898',
};

const areas: Area[] = [
  { name: 'Bán nhà riêng ở Quận 3, Hồ Chí Minh' },
  { name: 'Bán nhà riêng ở Tân Bình, Hồ Chí Minh' },
  { name: 'Bán nhà mặt phố ở Quận 10, Hồ Chí Minh' },
  { name: 'Bán nhà mặt phố ở Phú Nhuận, Hồ Chí Minh' },
  { name: 'Bán nhà mặt phố ở Tân Bình, Hồ Chí Minh' },
];

// VictoryReal component
const BrokerCard: React.FC = () => {
  return (
    <Box p={5} maxW="1200px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={6}
        alignItems={{ base: 'flex-start', md: 'center' }}
      >
        {/* Company Logo and Name */}
        <Box flex={2}>
          <Flex alignItems="center">
            <Image src={company.logo} alt="Victory Real Logo" boxSize="200px" mr={4} />
          </Flex>
        </Box>

        {/* Address and Contact */}
        <Box flex={4}>
            <Heading as="h2" size="sm">
                {company.name}
            </Heading>
          <Text fontSize="sm" color="gray.600" mb={2}>
            {company.address}
          </Text>
          <Flex alignItems="center" marginBottom={3}>
            <Text fontSize="sm" mr={2}>
              {company.phone}
            </Text>
          </Flex>
          <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.href = 'mailto:info@victoryreal.vn'}
            >
              Gửi Email
            </Button>
        </Box>

        {/* Brokerage Areas */}
        <Box flex={4}>
          <Text fontSize="sm" fontWeight="bold" color="gray.600" mb={2}>
            KHU VỰC CÔNG TY MÔI GIỚI
          </Text>
          {areas.map((area, index) => (
            <Text key={index} fontSize="sm" mb={1}>
              • {area.name}
            </Text>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default BrokerCard;