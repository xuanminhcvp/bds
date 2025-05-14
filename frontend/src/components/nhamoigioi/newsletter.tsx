import React from 'react';
import { Box, Flex, Heading, Input, Button, Icon } from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';

// Newsletter component
const Newsletter: React.FC = () => {
  return (
    <Box p={5} maxW="400px" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="sm">
      {/* Heading with Icon */}
      <Flex alignItems="center" mb={4}>
      <Icon as={FiMail} color="red.500" mr={2} />
        <Heading as="h2" size="md">
          Nhận bản tin từ Batdongsan.com.vn
        </Heading>
      </Flex>

      {/* Input and Button */}
      <Flex gap={3}>
        <Input
          placeholder="Nhập email"
          size="md"
          borderColor="gray.300"
        />
        <Button colorScheme="red" size="md">
          Đăng ký
        </Button>
      </Flex>
    </Box>
  );
};

export default Newsletter;