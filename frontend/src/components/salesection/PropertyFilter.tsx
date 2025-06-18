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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import useRealEstateStore from '../../stores';
import { PropertyFilterSlice } from '../../stores/slices/propertyFilterSlice';

const PropertyFilter: React.FC = () => {
  const { setFilterProperty, clearFilterProperty } = useRealEstateStore();

  const [filter, setFilter] = useState<Partial<PropertyFilterSlice['filterProperty']>>({
    property_type: '',
    category: '',
    price: { min: null, max: null },
    area: { min: null, max: null },
    bedrooms: null,
    bathrooms: null,
    address: '',
    title: '',
  });

  const handleChange = (key: string, value: any) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = () => setFilterProperty(filter);

  const handleClearFilter = () => {
    setFilter({
      property_type: '',
      category: '',
      price: { min: null, max: null },
      area: { min: null, max: null },
      bedrooms: null,
      bathrooms: null,
      address: '',
      title: '',
    });
    clearFilterProperty();
  };

  return (
    <Box bg="white" p={5} rounded="xl" shadow="md" mb={6}>
      <VStack spacing={5} align="stretch">
        <SimpleGrid columns={[1, 2]} spacing={4}>

          <FormControl>
            <FormLabel>Danh mục</FormLabel>
            <Select
              value={filter.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="apartment">Căn hộ</option>
              <option value="house">Nhà phố</option>
              <option value="villa">Biệt thự</option>
              <option value="land">Đất nền</option>
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
        </SimpleGrid>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton _expanded={{ bg: 'gray.100' }}>
              <Box flex="1" textAlign="left">
                Bộ lọc nâng cao
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={[1, 2]} spacing={4}>
                <FormControl>
                  <FormLabel>Giá (triệu VNĐ)</FormLabel>
                  <HStack>
                    <NumberInput
                      min={0}
                      value={filter.price?.min || ''}
                      onChange={(v) =>
                        handleChange('price', { ...filter.price, min: v ? Number(v) : null })
                      }
                    >
                      <NumberInputField placeholder="Từ" />
                    </NumberInput>
                    <NumberInput
                      min={0}
                      value={filter.price?.max || ''}
                      onChange={(v) =>
                        handleChange('price', { ...filter.price, max: v ? Number(v) : null })
                      }
                    >
                      <NumberInputField placeholder="Đến" />
                    </NumberInput>
                  </HStack>
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

                <FormControl>
                  <FormLabel>Số phòng ngủ</FormLabel>
                  <Select
                    value={filter.bedrooms || ''}
                    onChange={(e) =>
                      handleChange('bedrooms', e.target.value ? Number(e.target.value) : null)
                    }
                  >
                    <option value="">Tất cả</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Số phòng tắm</FormLabel>
                  <Select
                    value={filter.bathrooms || ''}
                    onChange={(e) =>
                      handleChange('bathrooms', e.target.value ? Number(e.target.value) : null)
                    }
                  >
                    <option value="">Tất cả</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

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

export default PropertyFilter;
