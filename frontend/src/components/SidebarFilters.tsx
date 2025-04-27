import { VStack, Text, Select, Portal } from "@chakra-ui/react";
import { priceRanges, areas } from "../mocks/data.ts";
import { FilterItem } from "../types/index.ts";

interface SidebarFiltersProps {
  onFilterChange: (filters: { priceRange?: string; areaRange?: string }) => void;
}

export default function SidebarFilters({ onFilterChange }: SidebarFiltersProps) {
  return (
    <VStack align="start" p={4} bg="gray.50" borderRadius="md" w="250px">
      <Text fontWeight="bold">Lọc theo giá</Text>
      <Select.Root
        collection={priceRanges}
        onValueChange={(e) => onFilterChange({ priceRange: e.value[0] })}
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
        onValueChange={(e) => onFilterChange({ areaRange: e.value[0] })}
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
    </VStack>
  );
}