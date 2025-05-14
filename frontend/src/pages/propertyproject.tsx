import { Box, Grid, GridItem } from "@chakra-ui/react";
import FeaturedSection from "../components/propertyproject/featuredsections.tsx";
import NewsSection from "../components/propertyproject/newssections.tsx";
import PropertyCard from "../components/propertyproject/propertycard.tsx";
import RealEstateNews from "../components/propertyproject/newscategories.tsx";

export default function PropertyProject() {
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Grid
        templateColumns={{ base: '1fr', md: '2fr 1fr' }}
        gap={6}
        h="100%"
      >
        <GridItem colSpan={1}>
          <PropertyCard />
        </GridItem>
        <GridItem colSpan={1}>
          <FeaturedSection />
          <NewsSection />
        </GridItem>
      </Grid>
      <RealEstateNews />
    </Box>
  );
}