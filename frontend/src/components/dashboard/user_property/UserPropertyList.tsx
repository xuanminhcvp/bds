import React, {useState, useEffect} from "react";
import { Property } from '../../../stores/type/PropertyType';

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Badge,
  Stack,
  Container,
} from '@chakra-ui/react';
import useRealEstateStore from "../../../stores";
import {get_property_by_user} from "./api.ts"
import {toast} from 'sonner'

const UserPropertyList: React.FC = () => {
    const baseURL = "http://localhost:8000"
    const { token } = useRealEstateStore();
    const [ properties, setProperties ] = useState<Property[]>([]);

    useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await get_property_by_user(token);
        setProperties(response);
      } catch (error) {
        toast.error('Fetch property by user failed')
      }
    };

    fetchProperties();
    }, []);

    return (
    <Container maxW="container.xl" py={6}>
      <Heading as="h2" size="lg" mb={6}>
        Danh sách bất động sản
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {properties.map((property) => (
          <GridItem key={property.property_id}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
              transition="all 0.2s"
            >
              <Image
                src={`${baseURL}${property.images[0]?.image_url}`}
                alt={property.title}
                h="200px"
                w="full"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                  {property.title}
                </Heading>
                <Text color="gray.600" mb={2}>
                  {property.address}
                </Text>
                <Text fontWeight="bold" color="green.600" mb={2}>
                  {property.price.toLocaleString("vi-VN")} VNĐ
                </Text>
                <Stack direction="row" mb={2}>
                  <Text>Diện tích: {property.area} m²</Text>
                  <Text>|</Text>
                  <Text>Phòng ngủ: {property.bedrooms}</Text>
                  <Text>|</Text>
                  <Text>Phòng tắm: {property.bathrooms}</Text>
                </Stack>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Hết hạn: {new Date(property.expires_at).toLocaleDateString("vi-VN")}
                </Text>
                <Badge
                  colorScheme={property.status === "pending" ? "yellow" : "green"}
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {property.status}
                </Badge>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default UserPropertyList;