import React, { useState } from 'react';
import { Box, Text, Stack, Button, HStack, VStack } from '@chakra-ui/react';
import useRealEstateStore from '../../stores';

const AREASHN = [
  'Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Long Biên', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hoàng Mai', 'Thanh Xuân',
  'Sóc Sơn', 'Đông Anh', 'Gia Lâm', 'Nam Từ Liêm', 'Thanh Trì', 'Bắc Từ Liêm', 'Mê Linh',
  'Hà Đông', 'Sơn Tây', 'Ba Vì', 'Phúc Thọ', 'Đan Phượng', 'Hoài Đức', 'Quốc Oai', 'Thạch Thất',
  'Chương Mỹ', 'Thanh Oai', 'Thường Tín', 'Phú Xuyên', 'Ứng Hòa', 'Mỹ Đức',
];

const AREASHCM = [
  'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12',
  'Bình Tân', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú',
  'Thủ Đức', 'Bình Chánh', 'Cần Giờ', 'Củ Chi', 'Hóc Môn', 'Nhà Bè'
];

const INITIAL_COUNT = 10; 

const AreaSidebar: React.FC = () => {
  const { setFilterProperty } = useRealEstateStore();
  const [showAll, setShowAll] = useState(false);

  const displayHN = showAll ? AREASHN : AREASHN.slice(0, INITIAL_COUNT);
  const displayHCM = showAll ? AREASHCM : AREASHCM.slice(0, INITIAL_COUNT);

  const handleAreaClick = (area: string) => {
    setFilterProperty({ address: area });
  };

  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <Text fontWeight="bold" mb={3} textAlign={"center"}>BĐS Khu vực</Text>
      <Stack spacing={2}>
        <HStack justify="space-between" align="start" spacing={4}>
          <VStack flex={1} spacing={1}>
            {displayHN.map(area => (
              <Box
                key={area}
                as="button"
                textAlign="left"
                w="full"
                px={2}
                py={1}
                rounded="md"
                _hover={{ bg: 'teal.50', color: 'teal.600' }}
                onClick={() => handleAreaClick(area)}
              >
                {area}
              </Box>
            ))}
          </VStack>
          <VStack flex={1} spacing={1}>
            {displayHCM.map(area => (
              <Box
                key={area}
                as="button"
                textAlign="left"
                w="full"
                px={2}
                py={1}
                rounded="md"
                _hover={{ bg: 'teal.50', color: 'teal.600' }}
                onClick={() => handleAreaClick(area)}
              >
                {area}
              </Box>
              ))}
          </VStack>
        </HStack>

        {(!showAll && (AREASHN.length > INITIAL_COUNT || AREASHCM.length > INITIAL_COUNT)) && (
            <Button
                variant="outline"
                colorScheme="teal"
                size="sm"
                onClick={() => setShowAll(true)}
            >
                Xem thêm
            </Button>
        )}
        {showAll && (
            <Button
                variant="outline"
                colorScheme="teal"
                size="sm"
                onClick={() => setShowAll(false)}
            >
                Thu gọn
            </Button>
        )}
      </Stack>
    </Box>
  );
};

export default AreaSidebar;