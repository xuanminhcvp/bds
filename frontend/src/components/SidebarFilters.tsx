import { VStack, Text, Select, Button } from "@chakra-ui/react";
import { priceRanges, areas } from "../mocks/data.ts";
import { FilterItem } from "../types/index.ts";
import useRealEstateStore from "../stores"; 

export default function SidebarFilters() {
  const { searchFilters, setSearchFilters } = useRealEstateStore();

  const handlePriceChange = (value: string) => {
    const [min, max] = value ? value.split("-").map(Number) : [0, Infinity];
    setSearchFilters({ minPrice: min, maxPrice: max });
  };

  const handleAreaChange = (value: string) => {
    const [min, max] = value ? value.split("-").map(Number) : [0, Infinity];
    setSearchFilters({ minArea: min, maxArea: max });
  };

  return (
    <VStack align="start" p={4} bg="gray.50" borderRadius="md" w="220px" gap={4}>
      <Text fontWeight="bold">Lọc theo giá</Text>
      <Select
        placeholder="Chọn khoảng giá"
        value={
          searchFilters.minPrice || searchFilters.maxPrice
            ? `${searchFilters.minPrice || 0}-${searchFilters.maxPrice === Infinity ? '' : searchFilters.maxPrice}`
            : ""
        }
        onChange={(e) => handlePriceChange(e.target.value)}
      >
        {priceRanges.map((priceRange: FilterItem) => (
          <option key={priceRange.value} value={priceRange.value}>
            {priceRange.label}
          </option>
        ))}
      </Select>

      <Text fontWeight="bold">Lọc theo diện tích</Text>
      <Select
        placeholder="Chọn diện tích"
        value={
          searchFilters.minArea || searchFilters.maxArea
            ? `${searchFilters.minArea || 0}-${searchFilters.maxArea === Infinity ? '' : searchFilters.maxArea}`
            : ""
        }
        onChange={(e) => handleAreaChange(e.target.value)}
      >
        {areas.map((area: FilterItem) => (
          <option key={area.value} value={area.value}>
            {area.label}
          </option>
        ))}
      </Select>

      <Button
        colorScheme="teal"
        onClick={() => setSearchFilters({ ...searchFilters })}
        w="full"
      >
        Áp dụng bộ lọc
      </Button>
    </VStack>
  );
}