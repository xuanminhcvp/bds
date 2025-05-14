import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

// Define the type for each award item
interface AwardItem {
  id: number;
  name: string;
  logo: string;
}

// Sample data based on the image
const awardData: AwardItem[] = [
  { id: 1, name: 'PropertyGuru Asia Property Awards', logo: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/apagf-horizontal.svg' },
  { id: 2, name: 'PropertyGuru For Business', logo: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/apagf-horizontal.svg' },
  { id: 3, name: 'PropertyGuru Report', logo: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/apagf-horizontal.svg' },
  { id: 4, name: 'Asia Real Estate Summit', logo: 'https://staticfile.batdongsan.com.vn/images/box-link-footer/apagf-horizontal.svg' },
];

const AwardsSection: React.FC = () => {
  return (
    <Box bg="gray.100" py={4}>
      {/* Awards Logos */}
      <Flex justify="space-around" align="center" wrap="wrap" gap={4}>
        {awardData.map((item) => (
          <Box key={item.id} textAlign="center">
            <Image src={item.logo} alt={item.name} maxWidth="150px" maxHeight="50px" objectFit="contain" mx="auto" />
            <Text fontSize="sm" color="gray.600" mt={1}>
              {item.name}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default AwardsSection;