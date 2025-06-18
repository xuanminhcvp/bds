import React from 'react';
import {
  Box,
  Heading,
  Button,
  VStack,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ChoosePostTypePage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const buttonBg = useColorModeValue('teal.500', 'teal.300');

  const handleNavigate = (type: string) => {
    if (type === 'property') {
      navigate('/postnew');
    } else {
      navigate('/projectnew');
    }
  };

  return (
    <Box p={6} bg={bgColor} minHeight="80vh">
      <Center>
        <VStack spacing={8} maxW="md" w="full">
          <Heading as="h1" size="lg" textAlign="center">
            Chọn loại tin đăng
          </Heading>
          <VStack spacing={4} w="full">
            <Button
              colorScheme="teal"
              bg={buttonBg}
              size="lg"
              w="full"
              onClick={() => handleNavigate('property')}
            >
              Đăng tin Bất Động Sản
            </Button>
            <Button
              colorScheme="teal"
              bg={buttonBg}
              size="lg"
              w="full"
              onClick={() => handleNavigate('project')}
            >
              Đăng tin Dự Án
            </Button>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default ChoosePostTypePage;