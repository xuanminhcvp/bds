import React from 'react';
import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';

interface AwardItem {
  id: number;
  name: string;
  logo: string;
  link?: string; 
}

const awardData: AwardItem[] = [
  {
    id: 1,
    name: 'PropertyGuru Asia Property Awards',
    logo: 'http://localhost:8000/assets/award/award1.png',
    link: 'https://www.asiapropertyawards.com/en/'
  },
  {
    id: 2,
    name: 'PropertyGuru For Business',
    logo: 'http://localhost:8000/assets/award/award2.png',
    link: 'https://www.asiapropertyawards.com/en/'
  },
  {
    id: 3,
    name: 'PropertyGuru Report',
    logo: 'http://localhost:8000/assets/award/award3.png',
    link: 'https://www.asiapropertyawards.com/en/'
  },
  {
    id: 4,
    name: 'Asia Real Estate Summit',
    logo: 'http://localhost:8000/assets/award/award4.png',
    link: 'https://www.asiapropertyawards.com/en/'
  },
];

const AwardsSection: React.FC = () => {
  return (
    <Box bg="gray.100" py={4}  position="relative" mt={6}>
      <Flex justify="center" align="center" wrap="wrap" gap={24}>
        {awardData.map((item) => (
          <Box key={item.id} textAlign="center">
            <Link href={item.link} isExternal>
              <Image
                src={item.logo}
                alt={item.name}
                maxWidth="150px"
                maxHeight="50px"
                objectFit="contain"
                mx="auto"
              />
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default AwardsSection;
