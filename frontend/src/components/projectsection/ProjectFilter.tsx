import {
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import useRealEstateStore from '../../stores';
import { ProjectFilterSlice } from '../../stores/slices/projectFilterSlice';

const ProjectFilter: React.FC = () => {
  const { setFilterProject, clearFilterProject } = useRealEstateStore();

  const [filter, setFilter] = useState<Partial<ProjectFilterSlice['filterProject']>>({
    status: '',
    area: { min: null, max: null },
    address: '',
    created_at: null,
  });

  const handleChange = (key: string, value: any) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = () => {
    setFilterProject(filter);
  };

  const handleClearFilter = () => {
    setFilter({
      status: '',
      area: { min: null, max: null },
      address: '',
      created_at: null,
    });
    clearFilterProject();
  };

  return (
    <Box bg="white" p={5} rounded="xl" shadow="md" mb={6}>
      <VStack spacing={5} align="stretch">
        <SimpleGrid columns={[1, 2]} spacing={4}>
          <FormControl>
            <FormLabel>Trạng thái</FormLabel>
            <Select
              value={filter.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="ongoing">Đang thi công</option>
              <option value="completed">Đã hoàn thành</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Địa chỉ</FormLabel>
            <Input
              value={filter.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Quận/Thành phố"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Ngày tạo (YYYY-MM-DD)</FormLabel>
            <Input
              type="date"
              value={filter.created_at || ''}
              onChange={(e) => handleChange('created_at', e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Diện tích (m²)</FormLabel>
            <HStack>
              <NumberInput
                min={0}
                value={filter.area?.min || ''}
                onChange={(v) =>
                  handleChange('area', { ...filter.area, min: v ? Number(v) : null })
                }
              >
                <NumberInputField placeholder="Từ" />
              </NumberInput>
              <NumberInput
                min={0}
                value={filter.area?.max || ''}
                onChange={(v) =>
                  handleChange('area', { ...filter.area, max: v ? Number(v) : null })
                }
              >
                <NumberInputField placeholder="Đến" />
              </NumberInput>
            </HStack>
          </FormControl>
        </SimpleGrid>

        <HStack justify="flex-end">
          <Button colorScheme="teal" onClick={handleApplyFilter}>
            Áp dụng
          </Button>
          <Button variant="outline" colorScheme="red" onClick={handleClearFilter}>
            Xóa lọc
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProjectFilter;
