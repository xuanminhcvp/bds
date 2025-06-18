import { Box, Text } from '@chakra-ui/react';
import FeaturedProperty from '../../components/homepage/FeaturedProperty';
import FeaturedProject from '../../components/homepage/FeaturedProject';
import AwardsSection from '../../components/homepage/AwardsSection';
import FeaturedCompanies from '../../components/homepage/----FeaturedCompanies';
import FeaturedPosts from '../../components/homepage/FeaturedPosts';

const HomePage = () => {
  return (
    <Box p={4} maxW="1200px" mx="auto">
        <FeaturedProperty />
        <FeaturedProject />
        <FeaturedPosts />
        <AwardsSection />
        <FeaturedCompanies />
    </Box>
  );
};

export default HomePage;
