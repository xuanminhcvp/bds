import { Box, Image, Text, Icon, Button, HStack } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Property } from "../types/index.ts";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="sm">
      <Image
        src={property.images[0] || "https://via.placeholder.com/300"}
        alt="Property"
        objectFit="cover"
        w="100%"
        h="300px"
        loading="lazy"
      />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md">{property.title}</Text>
        <Text color="red.500" fontWeight="bold" fontSize="lg">{property.price}</Text>
        <HStack mt={2} color="gray.600" fontSize="sm">
          <Text>{property.area}</Text>
          <Text>·</Text>
          <HStack>
            <Icon as={FaBed} />
            <Text>{property.beds}</Text>
          </HStack>
          <Text>·</Text>
          <HStack>
            <Icon as={FaBath} />
            <Text>{property.baths}</Text>
          </HStack>
        </HStack>
        <HStack mt={1} color="gray.500">
          <Icon as={MdLocationOn} />
          <Text fontSize="sm">{property.location}</Text>
        </HStack>
        <Text fontSize="sm" mt={2} color="gray.700">{property.description}</Text>
        <Button colorScheme="teal" mt={4} size="sm" borderRadius="full" w="full">
          0902 542 *** - Hiện số
        </Button>
      </Box>
    </Box>
  );
}