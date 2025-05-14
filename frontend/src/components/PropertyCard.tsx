import { Box, Image, Text, Icon, HStack, Avatar, Spacer } from "@chakra-ui/react";
import { FaBed, FaBath  } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Property } from "../types/index.ts";
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
  return (
    <Box borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm" w="660px">
      <Image
        src={
          property.images && property.images.length > 0
            ? property.images[0]
            : "https://images.unsplash.com/photo-1745428847642-34364849140e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
        }
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
        <Text color="red.500" fontWeight="bold" fontSize="lg">{formatPrice(property.price)} tỷ</Text>
        <Text>·</Text>
        <Text>{property.area}m²</Text>
        <Text>·</Text>
        <Icon as={FaBed} />
        <Text>{property.bedrooms}</Text>
        <Text>·</Text>
        <Icon as={FaBath} />
        <Text>{property.bathrooms}</Text>
        <Icon as={MdLocationOn} />
        <Text fontSize="sm">{property.location}</Text>
        </HStack>
        <Text fontSize="sm" mt={2} color="gray.700">{property.description}</Text>
        <HStack gap={3} mb={3}>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={property.owner.full_name} />
            <Avatar.Image src={property.owner.avatar || undefined} />
          </Avatar.Root>
          <Box>
          <Text fontSize="sm" fontWeight="medium">
            {property.owner.full_name}
          </Text>
            <Text fontSize="xs" color="gray.500">
            Posted on {new Date(property.created_at).toLocaleDateString("vi-VN")}
          </Text>
          </Box>
          <Spacer />
          <PhoneReveal phoneNumber={property.owner.phone_number} />
        </HStack>
      </Box>
    </Box>
  );
}
