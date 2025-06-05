import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { areas } from './data.ts';

export default function AreaSelect() {
  return (
    <FormControl>
      <FormLabel>Chọn diện tích</FormLabel>
      <Select placeholder="Chọn diện tích">
        {areas.map((area) => ( 
          <option key={area.value} value={area.value}>
            {area.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}