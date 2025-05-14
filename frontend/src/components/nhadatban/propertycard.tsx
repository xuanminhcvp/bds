// PropertyCard.tsx
import {
  Box,
  Image,
  Text,
  HStack,
  Icon,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

interface Property {
  id: number;
  title: string;
  price: string;
  area: string;
  beds: number;
  baths: number;
  parking: number;
  location: string;
  description: string;
  image: string;
  vip: boolean;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="sm">
      {property.vip && (
        <Badge colorScheme="red" position="absolute" m={2}>
          VIP KIM CƯƠNG
        </Badge>
      )}
      <Image src={property.image} alt="Property" objectFit="cover" w="100%" h="300px" />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md">
          {property.title}
        </Text>
        <Text color="red.500" fontWeight="bold" fontSize="lg">
          {property.price}
        </Text>
        <HStack mt={2} color="gray.600" fontSize="sm">
          <Text>{property.area}</Text>
          <Text>·</Text>
          <HStack><Icon as={FaBed} /> <Text>{property.beds}</Text></HStack>
          <Text>·</Text>
          <HStack><Icon as={FaBath} /> <Text>{property.baths}</Text></HStack>
          <Text>·</Text>
          <HStack><Icon as={FaCar} /> <Text>{property.parking}</Text></HStack>
        </HStack>
        <HStack mt={1} color="gray.500">
          <Icon as={MdLocationOn} />
          <Text fontSize="sm">{property.location}</Text>
        </HStack>
        <Text fontSize="sm" mt={2} color="gray.700">
          {property.description}
        </Text>
        <Button
          colorScheme="teal"
          mt={4}
          size="sm"
          borderRadius="full"
          w="full"
        >
          0902 542 *** - Hiện số
        </Button>
      </Box>
    </Box>
  );
}