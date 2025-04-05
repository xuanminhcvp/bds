import React from 'react';
import { Box, Flex, Text, Image, Stack, Heading, Button, Divider, Badge, SimpleGrid } from '@chakra-ui/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Property } from '../types'

interface PropertyDetailsProps {
    property: Property;
}




const PropertyDetails = ({ property }: PropertyDetailsProps ) => {
    return (
        <Box bg="gray.700" p={6} borderRadius="md">
        <Box maxW={"600px"} bg="gray.500" borderRadius="30px" mx={"auto"} py={8} px={4}>
            {/* Tieu de va gia */}
            <Flex justify={"space-between"} align={"center"} mb={6}>
                <Box>
                    <Heading as={"h1"} size={"2xl"} mb={2}>
                        {property.title}
                    </Heading>
                    <Flex align={"center"} color={"gray.700"}>
                        <MapPin size={20} />
                        <Text ml={2}>{property.location}</Text>
                    </Flex>
                </Box>
                <Box textAlign={"right"}>
                    <Text fontSize={"2xl"} fontWeight={"bold"} >
                        ${property.price.toLocaleString()}
                    </Text>
                    <Badge variant="solid" colorPalette="green" size="md" mt={2}>
                        Available
                    </Badge>
                </Box>
            </Flex>
            {/* gallery anh */}
            <Box mb={8}>
                <SimpleGrid column={{ base: 1, md: 3 }} gap={8}>
                    <Image
                        src={property.images[0]}
                        alt="Property main image"
                        borderRadius={"md"}
                        objectFit={"cover"}
                        w={"100%"}
                        h={{ base: "300px", md: "400px" }}                     
                    />
                    <SimpleGrid column={2} gap={4}>
                        {property.images.slice(1,5).map((img, index) => (
                            <Image 
                                key={index}
                                src={img}
                                alt={`Property image ${index + 2}`}
                                borderRadius={"md"}
                                objectFit={"cover"}
                                h={{ base: '140px', md: '80px' }}                                                           
                            />
                        ))}
                    </SimpleGrid>                    
                </SimpleGrid>
            </Box>
            {/* Thong tin chi tiet */}
                {/* Mo ta va dac diem */}
                <SimpleGrid columns={2} gap="40px">
                    <Box flex={2}>
                        <Heading as={"h2"} size={"2xl"} mb={2}>
                            Desciptions
                        </Heading>
                        <Text color={"gray.800"} mb={4}>
                            {property.description}
                        </Text>
                        <Heading as={"h2"} size={"xl"} mb={4}>
                            Property Details 
                        </Heading>                    
                        <SimpleGrid>                        
                            <Flex direction={"row"} gap={10} >
                                <Text fontWeight={"bold"}>Bedrooms:</Text>
                                <Text>8</Text>
                            </Flex>
                            <Flex direction={"row"} gap={10}>
                                <Text fontWeight={"bold"}>Bathrooms:</Text>
                                <Text>8</Text>
                            </Flex>
                            <Flex direction={"row"} gap={10}>
                                <Text fontWeight={"bold"}>Area:</Text>
                                <Text>8m2</Text>
                            </Flex>
                        </SimpleGrid>                
                    </Box>
                    {/* Thong tin lien he */}
                    <Box flex={1}>
                        <Box p={6} borderWidth={1} borderRadius={"md"} shadow={"sm"}>
                            <Heading as={"h3"} size={"md"} mb={2}>
                                Contact Agent
                            </Heading>
                            <Stack>
                                <Text fontWeight={"bold"}>{property.contactInfo.name}</Text>
                                <Flex align={"center"}>
                                    <Phone size={"16"}/>
                                    <Text ml={2}>{property.contactInfo.phone}</Text>
                                </Flex>
                                <Flex align={"center"}>
                                    <Mail size={"16"} />
                                    <Text ml={2}>{property.contactInfo.email}</Text>
                                </Flex>
                                <Button colorScheme={"blue"} mt={4}>
                                    Contact Now
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </SimpleGrid>
                <Box mt={8}>
                    <Heading as={"h3"} size={"xl"} mb={4}>
                        Location
                    </Heading>
                    <Box
                        w={"50%"}
                        h={"200px"}
                        bg={"gray.200"}
                        borderRadius={"md"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}                        
                    >
                        <Heading as={"h3"} size={"xs"}>Map Placeholder - Integrate Google Maps here</Heading>
                    </Box>
                </Box>                                
        </Box>
    </Box>
)};




export default PropertyDetails;



