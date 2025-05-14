import { VStack, Text } from '@chakra-ui/react';

const CompanyInfo = () => {
    return (
      <VStack align="start" gap={2}>
        <Text fontWeight="bold">Công ty cổ phần PropertyGuru Việt Nam</Text>
        <Text fontSize="sm">Tầng 31, Keangnam Hanoi Landmark, Phường Hưng, Nam Từ Liêm, Hà Nội</Text>
        <Text fontSize="sm">(024) 3562 5939 - (024) 3562 5940</Text>
      </VStack>
    );
  };

export default CompanyInfo;