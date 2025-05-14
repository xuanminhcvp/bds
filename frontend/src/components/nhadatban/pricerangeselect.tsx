import {
  Select,
  Portal
} from '@chakra-ui/react';
import { priceRanges } from './data.ts';

export default function PriceRangeSelect() {
  return (
    <Select.Root collection={priceRanges}>
      <Select.HiddenSelect />
      <Select.Label>Chọn khoảng giá</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Chọn khoảng giá" />
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {priceRanges.items.map((priceRange) => (
              <Select.Item item={priceRange} key={priceRange.value}>
                {priceRange.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}