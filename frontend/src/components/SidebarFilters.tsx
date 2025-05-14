import { VStack, Text, Select, Portal, Button } from "@chakra-ui/react";
import { priceRanges, areas } from "../mocks/data.ts";
import { useState, useEffect } from "react";
import { FilterItem } from "../types/index.ts";

interface SidebarFiltersProps {
  filters: { priceRange?: string; areaRange?: string };
  onFilterChange: (filters: { priceRange?: string; areaRange?: string }) => void;
}

export default function SidebarFilters({ filters, onFilterChange }: SidebarFiltersProps) {
  const [priceRange, setPriceRange] = useState<string>(filters.priceRange || "");
  const [areaRange, setAreaRange] = useState<string>(filters.areaRange || "");

  useEffect(() => {
    setPriceRange(filters.priceRange || "");
    setAreaRange(filters.areaRange || "");
  }, [filters]);

  const handleSubmit = () => {
    onFilterChange({
      ...filters, 
      priceRange: priceRange || undefined, 
      areaRange: areaRange || undefined, 
    });
  };

  return (
    <VStack align="start" p={4} bg="gray.50" borderRadius="md" w="220px" gap={4}>
      <Text fontWeight="bold">Lọc theo giá</Text>
      <Select.Root
        collection={priceRanges}
        onValueChange={(e) => setPriceRange(e.value[0] || "")}
        value={priceRange ? [priceRange] : []}
      >
        <Select.HiddenSelect />
        <Select.Label>Chọn khoảng giá</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Chọn khoảng giá" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {priceRanges.items.map((priceRange: FilterItem) => (
                <Select.Item item={priceRange} key={priceRange.value}>
                  {priceRange.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Text fontWeight="bold">Lọc theo diện tích</Text>
      <Select.Root
        collection={areas}
        onValueChange={(e) => setAreaRange(e.value[0] || "")}
        value={areaRange ? [areaRange] : []}
      >
        <Select.HiddenSelect />
        <Select.Label>Chọn diện tích</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Chọn diện tích" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {areas.items.map((area: FilterItem) => (
                <Select.Item item={area} key={area.value}>
                  {area.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Button colorScheme="teal" onClick={handleSubmit} w="full">
        Áp dụng bộ lọc
      </Button>
    </VStack>
  );
}