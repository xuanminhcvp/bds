import {useEffect, useState} from "react";
import axios from "axios";
import { Box, Spinner, Text, List, Button, Alert, Flex, Grid, HStack, VStack, Heading, Badge, SimpleGrid } from "@chakra-ui/react";

type Property = {
    id: string; 
    title: string;
    description: string | null;
    price: string;
    location: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    property_type: string;
    status: string;
    owner_id: string; 
    is_verified: boolean;
    created_at: string;
    updated_at: string;
};

const PropertyCard: React.FC<Property> = ({ title, description, price, location, area, bedrooms, bathrooms, property_type, owner_id }) => {
    return (
        <Box 
            w="full"
            p={4}
            borderRadius="lg"
            boxShadow="base"
            _hover={{ boxShadow: 'lg', bgGradient: 'linear(to-r, gray.100, white)' }}
            transition="all 0.3s"
        >
            <VStack gap={2} align="start">
                <Heading size="md">{title}</Heading>
                <Badge>{price}</Badge>
                <Text>{description || "No description available"}</Text>
                <Text>Location: {location}</Text>
                <Text>Area: {area}</Text>
                <Text>Bedrooms: {bedrooms}</Text>
                <Text>Bathrooms: {bathrooms}</Text>
                <Text>Type: {property_type}</Text>
                <Text>Owner ID: {owner_id}</Text>
            </VStack>
        </Box>
    )
};

const PropertyList = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const propertiesPerPage = 9;
    const maxPageButtons = 5;


    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/v1/properties")
                setProperties(response.data);
            } 
            catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
            finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(properties.length / propertiesPerPage)

    const hanldePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) return <Spinner size="xl" />;
    if (error) return (
        <Alert.Root status="info" title="error">
            <Alert.Indicator />
            <Alert.Title>Have a error: {error}</Alert.Title>
        </Alert.Root>
    );



    return (
        <Box padding="5" boxShadow="md" borderRadius="lg">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Danh sach BDS</Text>
            <SimpleGrid
                      columns={{ base: 1, md: 2, lg: 3 }} // Responsive: 1 cột trên mobile, 2 trên medium, 3 trên large
                      gap={6} // Khoảng cách giữa các card
                      maxW="1200px"
                      mx="auto" // Căn giữa
                    >
                {currentProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        title={property.title}
                        description={property.description}
                        price={property.price}
                        location={property.location}
                        area={property.area}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        property_type={property.property_type}
                        owner_id={property.owner_id}
                    />
                ))}
            </SimpleGrid>
            
            {/* Nut phan trang */}
            {totalPages > 1 && (
                <Flex justify={"center"} mt={"6"} gap={"2"}>
                    <Button
                        onClick={() => hanldePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index + 1}
                            onClick={() => hanldePageChange(index + 1)}
                            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button 
                        onClick={() => hanldePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </Flex>
            )}
        </Box>
    );
};

export default PropertyList;