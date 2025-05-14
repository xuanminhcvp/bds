import { Box, Grid } from "@chakra-ui/react";
import WikiBds1 from "../components/wikibds/wikibds.tsx";
import Categories from "../components/wikibds/categories.tsx";
import MostViewed from "../components/wikibds/mostviewed.tsx";
import MarketCities from "../components/wikibds/marketcities.tsx";
import TopCities from "../components/wikibds/topcities.tsx";
import PropertyCard from "../components/wikibds/propertycard.tsx";
import FeaturedTopics from "../components/wikibds/featuredtopics.tsx";


export default function PhanTichDanhGia() {
  return (
    <Box p={4} maxW="1200px" mx="auto">
        <WikiBds1 />
        <Categories />
        <Box p={5}>
          <Grid
            templateColumns={{ base: '1fr', md: '3fr 1fr' }}
            gap={6}
            maxW="1200px"
            mx="auto"
          >
            {/* Main Content */}
            <Box>
              <PropertyCard />
            </Box>

            {/* Sidebar */}
            <Box>
              <MostViewed />
              <MarketCities />
              <TopCities />
            </Box>
          </Grid>
        </Box>
        <FeaturedTopics />
    </Box>
  );
}