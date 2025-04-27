import { Box, HStack, Button } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';


export const FilterBar = () => {
    return (
        <HStack gap={4} mb={6} flexWrap={'wrap'}>
            <Select placeholder="tinh/thanh pho">
                <option>TpHCM</option>
                <option>Ha Noi</option>
                <option>Da Nang</option>
            </Select>
        </HStack>
    )
}