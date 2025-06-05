import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { priceRanges } from './data.ts';

export default function PriceRangeSelect() {
  return (
    <FormControl>
      <FormLabel>Chọn khoảng giá</FormLabel>
      <Select placeholder="Chọn khoảng giá">
        {priceRanges.map((priceRange) => ( 
          <option key={priceRange.value} value={priceRange.value}>
            {priceRange.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}