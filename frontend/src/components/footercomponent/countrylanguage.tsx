import { VStack, Text, Select } from '@chakra-ui/react';

const CountryLanguage = () => {
  return (
    <VStack align="start" gap={2}>
      <Text fontWeight="bold">Quốc gia & Ngôn ngữ</Text>
      <Select size="sm" width="200px" placeholder="Chọn quốc gia">
        <option value="vi">Việt Nam</option>
        <option value="us">United States</option>
        <option value="jp">Japan</option>
      </Select>
    </VStack>
  );
};

export default CountryLanguage;