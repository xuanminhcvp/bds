import { Text, VStack } from '@chakra-ui/react';

const CopyrightInfo = () => {
  return (
    <VStack align="start" gap={2}>
      <Text fontSize="xs">Copyright © 2007-2025 Batdongsan.com.vn</Text>
      <Text fontSize="xs">
        Giấy ĐKKD số: 0104664079 do Sở KHĐT TP Hà Nội cấp ngày 02/06/2010
      </Text>
      <Text fontSize="xs">Số TTTT Hà Nội cấp ngày 31/08/2023</Text>
    </VStack>
  );
};

export default CopyrightInfo;
