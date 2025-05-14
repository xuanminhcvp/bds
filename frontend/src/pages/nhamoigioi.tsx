import { Box, Grid } from "@chakra-ui/react";
import Newsletter from "../components/nhamoigioi/newsletter.tsx";
import PropertyTypes from "../components/nhamoigioi/propertytypes.tsx";
import FeaturedBrokers from "../components/nhamoigioi/companies.tsx";
import ByProvince from "../components/nhamoigioi/byprovince.tsx";
import BrokerCard from "../components/nhamoigioi/brokercard.tsx";

export default function Nhamoigioi() {
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Grid
        templateColumns={{ base: '1fr', md: '3fr 1fr' }}
        gap={6}
      >
        {/* Main Content */}
        <Box>
          <BrokerCard />
        </Box>

        {/* Sidebar */}
        <Box>
          <Newsletter />
          <PropertyTypes />
          <FeaturedBrokers />
          <ByProvince />
        </Box>
      </Grid>
    </Box>
  );
}