import { Box, Flex, VStack } from '@chakra-ui/react';
import CompanyInfo from "../components/footercomponent/companyinfo.tsx";
import CountryLanguage from "../components/footercomponent/countrylanguage.tsx";
import GuideSection from "../components/footercomponent/guidesection.tsx";
import NewsletterSignup from "../components/footercomponent/newslettersignup.tsx";
import PolicySection from "../components/footercomponent/policysection.tsx";
import BranchesSection from "../components/footercomponent/branchitem.tsx";
import CopyrightInfo from "../components/footercomponent/copyrightinfo.tsx";
import ContactInfo from "../components/footercomponent/contactinfo.tsx";
import SocialIcons from "../components/footercomponent/socialicons.tsx";

const Footer = () => {
    return (
      <Box bg="gray.100" py={6} px={4}>
        <Box maxW="1200px" mx="auto">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
            gap={4}
          >
            <VStack align="start" gap={4}>
              <CompanyInfo />
            </VStack>
            <GuideSection />
            <PolicySection />
            <VStack align="start" gap={4}>
              <NewsletterSignup />
              <CountryLanguage />
            </VStack>
          </Flex>
          <BranchesSection />
          <Box borderTop="1px solid" borderColor="gray.300" py={4}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
            maxW="1200px"
            mx="auto"
            gap={4}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <CopyrightInfo />
            <ContactInfo />
            <SocialIcons />
          </Flex>
        </Box>
        </Box>
      </Box>
    );
  };
  
export default Footer;