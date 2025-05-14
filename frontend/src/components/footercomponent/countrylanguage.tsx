import { VStack, Text, Portal, Select, createListCollection } from '@chakra-ui/react';

const CountryLanguage = () => {
    const countries = createListCollection({
      items: [
        { label: "Việt Nam", value: "vi" },
        { label: "United States", value: "us" },
        { label: "Japan", value: "jp" },
      ],
    });
  
    return (
      <VStack align="start" gap={2}>
        <Text fontWeight="bold">Quốc gia & Ngôn ngữ </Text>
        <Select.Root collection={countries} size="sm" width="200px">
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Chọn quốc gia" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {countries.items.map((country) => (
                  <Select.Item item={country} key={country.value}>
                    {country.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </VStack>
    );
  };

export default CountryLanguage;