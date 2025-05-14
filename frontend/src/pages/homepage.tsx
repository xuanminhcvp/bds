import { Box, Text } from '@chakra-ui/react';
import NewsHighlight from "../components/homepage/newshighlight.tsx";
import PropertyList from "../components/homepage/propertyhomepage.tsx";
import PropertyAddress from "../components/homepage/propertyaddress.tsx";
import News from "../components/homepage/news.tsx";
import UtilitySupport from "../components/homepage/utilitysupport.tsx";
import FeaturedCompanies from "../components/homepage/featuredcompanies.tsx";
import PropertySections from "../components/homepage/propertysections.tsx";
import AwardsSection from "../components/homepage/awardssection.tsx";
import ContentSection from "../components/homepage/contentsection.tsx";
import FooterLinks from "../components/homepage/footerlinks.tsx";

// import CarouselHomepage from "../components/homepage/carouselhomepage.tsx";

const HomePage = () => {
    return (
      <Box p={"8"}>
            <NewsHighlight />
            <PropertyList />
            <Box h={"4"}>
                <Text>Carousel</Text>
            </Box>
            <PropertyAddress />
            <News />
            <UtilitySupport />
            <FeaturedCompanies />
            <PropertySections />
            <AwardsSection />
            <ContentSection />
            <FooterLinks />
      </Box>
    );
  };
  
export default HomePage;