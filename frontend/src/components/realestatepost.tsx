import React from "react";
import {
    Box, 
    Image,
    Heading,
    Text,
    Stack,
    Badge,
    Grid,
    GridItem,
    Button,
} from "@chakra-ui/react";

interface RealEstateData {
    title: string;
    description: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    image: string;
    isFeatured?: boolean;
  }

  const sampleData: RealEstateData = {
    title: "Căn hộ cao cấp 3PN tại Quận 7, TP.HCM",
    description:
      "Căn hộ nằm trong khu đô thị hiện đại, đầy đủ tiện ích như hồ bơi, gym, trường học, công viên. Thiết kế sang trọng, ban công thoáng mát.",
    price: "4.2 tỷ",
    location: "Sunrise City, Quận 7, TP.HCM",
    bedrooms: 3,
    bathrooms: 2,
    area: "105m²",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
};

const RealEstatePost: React.FC = () => {
    return (
      <Box
        maxW="800px"
        mx="auto"
        p={6}
        bg={"gray.200"}
        borderRadius="xl"
        boxShadow="lg"
      >
        <Image
          src={sampleData.image}
          alt={sampleData.title}
          borderRadius="lg"
          mb={4}
        />
  
        <Stack gap={3}>
          <Heading size="lg">{sampleData.title}</Heading>
          {sampleData.isFeatured && (
                <Badge colorScheme="green" w="fit-content">
                Nổi bật
                </Badge>
          )}
          <Text fontSize="xl" color="red.500" fontWeight="bold">
                {sampleData.price}
          </Text>
          <Text color="gray.600">{sampleData.location}</Text>
          <Text>{sampleData.description}</Text>
        </Stack>
  
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6}>
            <GridItem>
                <Text fontWeight="bold">Phòng ngủ</Text>
                <Text>{sampleData.bedrooms}</Text>
            </GridItem>
          <GridItem>
                <Text fontWeight="bold">Phòng tắm</Text>
                <Text>{sampleData.bathrooms}</Text>
          </GridItem>
          <GridItem>
                <Text fontWeight="bold">Diện tích</Text>
                <Text>{sampleData.area}</Text>
          </GridItem>
        </Grid>
  
        <Button colorScheme="teal" mt={6} w="full">
          Liên hệ ngay
        </Button>
      </Box>
    );
};
  
export default RealEstatePost;