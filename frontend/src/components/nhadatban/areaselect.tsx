import {
  Select,
  Portal
} from '@chakra-ui/react';
import { areas } from './data.ts';

export default function AreaSelect() {
  return (
    <Select.Root collection={areas}>
      <Select.HiddenSelect />
      <Select.Label>Chọn diện tích</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Chọn diện tích" />
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {areas.items.map((area) => (
              <Select.Item item={area} key={area.value}>
                {area.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}