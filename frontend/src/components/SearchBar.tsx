import { Input, Button, Flex, Select } from "@chakra-ui/react";

const propertyTypes = [
    { label: "Nha", value: "house" },
    { label: "Can ho", value: "apartment" },
    { label: "Dat", value: "land" },
];

const locations = [
    { label: "Ha Noi", value: "hanoi" },
    { label: "TP.HCM", value: "hochiminh" },
];

function SearchBar() {
    return (
        <Flex direction="column" align="center" my={8}>
            <Input placeholder="Tim kiem bat dong san" mb={4} width="400px" />

            <Flex width="400px" justify="space-between">
                {/* Property Type Select */}
                <Select
                    placeholder="Chon loai bat dong san"
                    width="48%"
                    size="sm"
                >
                    {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </Select>
                {/* Location Select */}
                <Select
                    placeholder="Chon khu vuc"
                    width="48%"
                    size="sm"
                >
                    {locations.map((location) => (
                        <option key={location.value} value={location.value}>
                            {location.label}
                        </option>
                    ))}
                </Select>              
            </Flex>

            <Button colorScheme="blue" mt={4} width="400px">Tim kiem</Button>
        </Flex>
    );
}

export default SearchBar;