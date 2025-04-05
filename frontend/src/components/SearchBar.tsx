import { Portal, Select, createListCollection, Input, Button, Flex } from "@chakra-ui/react";

const propertyTypes = createListCollection ({
    items: [
        { lable: "Nha", value: "house" },
        { lable: "Can ho", value: "apartment" },
        { lable: "Dat", value: "land" },
    ],
})

const locations = createListCollection({
    items: [
        { lable: "Ha Noi", value: "hanoi" },
        { lable: "TP.HCM", value: "hochiminh" },
    ],
})

function SearchBar() {
    return (
        <Flex direction={"column"} align={"center"} my={8}>
            <Input placeholder="Tim kiem bat dong san" mb={4} width={"400px"} />

            <Flex width={"400px"} justify="space-between">
                {/* Property Type Select */}
                <Select.Root collection={propertyTypes} width={"48%"} size={"sm"}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Chon loai bat dong san" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {propertyTypes.items.map((type) => (
                                    <Select.Item item={type} key={type.value}>
                                        {type.lable}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                {/* Location Select */}
                <Select.Root collection={locations} width={"48"} size={"sm"}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Chon khu vuc" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {locations.items.map((location) => (
                                    <Select.Item item={location} key={location.value}>
                                        {location.lable}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>              
            </Flex>

            <Button colorScheme={"blue"} mt={4} width={"400px"}>Tim kiem</Button>
        </Flex>
    )
}

export default SearchBar