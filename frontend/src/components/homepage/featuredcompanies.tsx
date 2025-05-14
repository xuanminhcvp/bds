import React from 'react';
import { Box, Heading, Flex, Image, Button } from '@chakra-ui/react';

// Define the type for each company item
interface CompanyItem {
  id: number;
  name: string;
  logo: string;
}

// Sample data based on the image (using placeholders for logos)
const companyData: CompanyItem[] = [
  { id: 1, name: 'Kim Tinh Group', logo: 'https://file4.batdongsan.com.vn/2022/08/25/20220825105336-1842_wm.jpg' },
  { id: 2, name: 'Cát Tường Group', logo: 'https://file4.batdongsan.com.vn/2022/08/25/20220825105336-1842_wm.jpg' },
  { id: 3, name: 'SP Home', logo: 'https://file4.batdongsan.com.vn/2022/08/25/20220825105336-1842_wm.jpg' },
  { id: 4, name: 'Đức Hùng Land', logo: 'https://file4.batdongsan.com.vn/2022/08/25/20220825105336-1842_wm.jpg' },
  { id: 5, name: 'Kim Oanh Group', logo: 'https://file4.batdongsan.com.vn/2022/08/25/20220825105336-1842_wm.jpg' },
  { id: 6, name: 'Sea Holdings', logo: 'https://file4.batdongsan.com.vn/2022/08/25/20220825105336-1842_wm.jpg' },
];

const FeaturedCompanies: React.FC = () => {
  return (
    <Box p={4}>
      {/* Heading */}
      <Heading as="h2" size="lg" mb={4}>
        Doanh nghiệp tiêu biểu
      </Heading>

      {/* Company Logos with Navigation */}
      <Flex align="center" position="relative">
        <Button variant="outline" size="sm" mr={2}>{"<"}</Button>
        {companyData.map((item) => (
          <Box
            key={item.id}
            p={2}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            mr={4}
            width="150px"
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={item.logo} alt={item.name} objectFit="contain" maxWidth="100%" maxHeight="100%" />
          </Box>
        ))}
        <Button variant="outline" size="sm" ml={2}>{">"}</Button>
      </Flex>
    </Box>
  );
};

export default FeaturedCompanies;