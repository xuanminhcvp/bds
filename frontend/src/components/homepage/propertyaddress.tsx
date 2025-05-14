import React from 'react';
import { Box, Grid, GridItem, Heading, Image, Text, Wrap, WrapItem, Button } from '@chakra-ui/react';

// Define the type for each real estate item
interface RealEstateItem {
  city: string;
  listings: number;
  image: string;
}

// Sample data based on the image
const realEstateData: RealEstateItem[] = [
  { city: 'TP. Hồ Chí Minh', listings: 46417, image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
  { city: 'Hà Nội', listings: 44175, image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
  { city: 'Đà Nẵng', listings: 7963, image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
  { city: 'Bình Dương', listings: 6445, image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
  { city: 'Đồng Nai', listings: 3606, image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/hinh-1.jpg' },
];

// Filter options based on the image
const filters: string[] = [
  'Vinhomes Central Park',
  'Vinhomes Grand Park',
  'Vinhomes Smart City',
  'Vinhomes Ocean Park',
  'Vũng Tàu Pearl',
  'Bcons Green View',
  'Grandeur Palace',
];

const PropertyAddress: React.FC = () => {
  return (
    <Box p={4}>
      {/* Heading */}
      <Heading as="h2" size="lg" mb={4}>
        Bất động sản theo địa điểm
      </Heading>

      {/* Main Grid with 2 columns */}
      <Grid
        templateColumns="1fr 1fr"
        gap={4}
        mb={4}
      >
        {/* Column 1: TP. Hồ Chí Minh */}
        <GridItem
          position="relative"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
        >
          <Image
            src={realEstateData[0].image}
            alt={realEstateData[0].city}
            objectFit="cover"
            w="100%"
            h="100%"
            minHeight="600px"
          />
          <Box
            position="absolute"
            top={4}
            left={4}
            bg="rgba(0, 0, 0, 0.5)"
            color="white"
            p={2}
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {realEstateData[0].city}
            </Text>
            <Text fontSize="sm">
              {realEstateData[0].listings.toLocaleString()} tin đăng
            </Text>
          </Box>
        </GridItem>

        {/* Column 2: Nested Grid with 2x2 layout */}
        <GridItem>
          <Grid
            templateColumns="1fr 1fr"
            templateRows="1fr 1fr"
            gap={4}
          >
            {realEstateData.slice(1).map((item, index) => (
              <GridItem
                key={index}
                position="relative"
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
              >
                <Image
                  src={item.image}
                  alt={item.city}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  minHeight="300px"
                />
                <Box
                  position="absolute"
                  top={4}
                  left={4}
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  p={2}
                  borderRadius="md"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {item.city}
                  </Text>
                  <Text fontSize="sm">
                    {item.listings.toLocaleString()} tin đăng
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </GridItem>
      </Grid>

      {/* Filter buttons */}
      <Wrap gap={2} justify="center">
        {filters.map((filter, index) => (
          <WrapItem key={index}>
            <Button
              variant="outline"
              colorScheme="gray"
              size="sm"
              borderRadius="full"
            >
              {filter}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default PropertyAddress;