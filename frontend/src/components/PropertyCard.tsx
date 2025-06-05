import { Box, Image, Text, Icon, HStack, Avatar, Spacer } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Property } from "../stores/type/PropertyType.ts";
import PhoneReveal from "../components/nhadatban/phonereveal.tsx";

interface PropertyCardProps {
  property: Property;
}

const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numPrice)) return "0"; 
  if (Number.isInteger(numPrice)) {
    return numPrice.toString(); 
  }
  const priceStr = numPrice.toFixed(2).replace(".", ","); 
  if (priceStr.endsWith(",50")) {
    return priceStr.slice(0, -1); 
  }
  return priceStr; 
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const baseURL = "http://localhost:8000"
  const imagePathFromDB = property.images[0].image_url
  const fullImageURL = `${baseURL}${imagePathFromDB}`

  return (
    <Box borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm" w="660px">
      <Image
        src={fullImageURL}
        alt={property.title}
        borderRadius="lg"
        objectFit="cover"
        w="100%"
        h="200px"
        loading="lazy"
      />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md">{property.title}</Text>
        <HStack mt={2}>
          <Text color="red.500" fontWeight="bold" fontSize="lg">{property.price.toLocaleString("vi-VN")} đ</Text>
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
        <Text fontSize="sm" mt={2} color="gray.700">{property.description}</Text>
        <HStack gap={3} mb={3}>
          <Avatar
            size="sm"
            name={property.user.name}
            src={`${baseURL}${property.user.avatar}` || undefined}
          />
          <Box>
            <Text fontSize="sm" fontWeight="medium">
              {property.user.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Posted on {new Date(property.updated_at).toLocaleDateString("vi-VN")}
            </Text>
          </Box>
          <Spacer />
          <PhoneReveal phoneNumber={property.user.phone} />
        </HStack>
      </Box>
    </Box>
  );
}