import {
  Box,
  Image,
  Text,
  Icon,
  HStack,
  Avatar,
  Spacer,
} from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { Property } from '../../stores/type/PropertyType.ts';
import PhoneReveal from '../../utils/phoneReveal.tsx';
import { formatPrice } from '../../utils/formatPrice.ts';
import { useNavigate } from 'react-router-dom';
interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();
  const fullImageURL = property?.images?.[0]?.image_url || '';

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="sm"
      w="660px"
    >
      <Image
        src={fullImageURL}
        alt={property.title}
        borderRadius="lg"
        objectFit="cover"
        w="100%"
        h="200px"
        loading="lazy"
        onClick={() => navigate(`/property/${property.property_id}`)}
        cursor="pointer"
      />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md" onClick={() => navigate(`/property/${property.property_id}`)} cursor={'pointer'}>
          {property.title}
        </Text>
        <HStack mt={2}>
          <Text color="red.500" fontWeight="bold" fontSize="lg">
            {formatPrice(property.price)}
          </Text>
          <Text>·</Text>
          <Text>{property.area}m²</Text>
          <Text>·</Text>
          <Icon as={FaBed} />
          <Text>{property.bedrooms}</Text>
          <Text>·</Text>
          <Icon as={FaBath} />
          <Text>{property.bathrooms}</Text>
          <Icon as={MdLocationOn} />
          <Text fontSize="sm">{property.address}</Text>
        </HStack>
        <Text fontSize="sm" mt={2} color="gray.700">
          {property.description}
        </Text>
        <HStack gap={3} mb={3}>
          <Avatar
            size="sm"
            name={property.user.name}
            src={property.user.avatar || undefined}
          />
          <Box>
            <Text fontSize="sm" fontWeight="medium">
              {property.user.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Posted on{' '}
              {new Date(property.updated_at).toLocaleDateString('vi-VN')}
            </Text>
          </Box>
          <Spacer />
          <PhoneReveal phoneNumber={property.user.phone} />
        </HStack>
      </Box>
    </Box>
  );
}
