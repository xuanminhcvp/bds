import React from 'react';
import {
  Box,
  VStack,
  Text,
  HStack,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoLogoApple } from "react-icons/io5";
import { BsAndroid2 } from "react-icons/bs";


const AppPromotion: React.FC = () => {

  return (
    <Box
      bg={'gray.300'}
      borderRadius="lg"
      p={6}
      mt={10}
      boxShadow="md"
      maxW="1200px"
      mx="auto"
    >
      <HStack
        spacing={6}
        align="center"
        justify="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        {/* Hình ảnh điện thoại */}
        <Box
          position="relative"
          flex="1"
          ml={{ base: 0, md: 10 }}
        >
          <Image
            src="http://localhost:8000/assets/property/banner-phone.png
            " 
            alt="Phone with app"
            maxH="300px"
            objectFit="contain"
            
          />
        </Box>
        {/* Nội dung văn bản và nút */}
        <VStack align="start" spacing={4} maxW={{ base: '100%', md: '50%' }} >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Do more on the app.
          </Text>
          <Text
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.300')}
            textAlign={{ base: 'center', md: 'left' }}
          >
            Save your searches, track enquiries, see floorplans and more.
            Available on iOS and Android.
          </Text>
          <HStack spacing={4}>
            <Button
              as="a"
              href="https://www.apple.com/app-store/" 
              target="_blank"
              leftIcon={<IoLogoApple />}
              colorScheme="teal"
              variant="solid"
              size="sm"
            >
              Download on App Store
            </Button>
            <Button
              as="a"
              href="https://play.google.com/store" 
              target="_blank"
              leftIcon={<BsAndroid2 />}
              colorScheme="teal"
              variant="solid"
              size="sm"
            >
              Get it on Google Play
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AppPromotion;