import { VStack, Text } from '@chakra-ui/react';
import PriceRangeSelect from './pricerangeselect.tsx';
import AreaSelect from './areaselect.tsx';

export default function SidebarFilters() {
  return (
    <VStack align="start" p={4} bg="gray.50" borderRadius="md" w="250px">
      <Text fontWeight="bold">Lọc theo giá</Text>
      <PriceRangeSelect />
      <Text fontWeight="bold">Lọc theo diện tích</Text>
      <AreaSelect />
    </VStack>
  );
}