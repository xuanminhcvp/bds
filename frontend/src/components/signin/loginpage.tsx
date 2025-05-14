import React from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Input, 
  Button, 
  Link, 
  Image,
  Container,
  IconButton,
} from '@chakra-ui/react';

const LoginPage: React.FC = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
        {/* Left Section - Illustration */}
        <Box flex={1} display={{ base: 'none', md: 'block' }}>
          <Image src="https://cdn-icons-png.freepik.com/256/295/295128.png" alt="Login Illustration" />
          <Text mt={4} color="gray.600" fontSize="sm">
            Tim nhà đất<br />Batdongsan.com.vn dẫn lối
          </Text>
        </Box>

        {/* Right Section - Login Form */}
        <Box flex={1} p={6} borderWidth="1px" borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
            Đăng nhập để tiếp tục
          </Text>
          <Input
            placeholder="SĐT/chính hộc email"
            mb={4}
            type="text"
            variant="outline"
          />
          <Input
            placeholder="Mật khẩu"
            mb={4}
            type="password"
            variant="outline"
          />
          <Button colorScheme="red" width="full" mb={4}>
            Đăng nhập
          </Button>
          <Flex justify="space-between" align="center" mb={4}>
            <Text colorScheme="teal">Nhớ tài khoản</Text>
            <Link color="teal.500" fontSize="sm">Quên mật khẩu?</Link>
          </Flex>
          <Flex direction="column" align="center" mb={4}>
            <Text fontSize="sm" color="gray.600">Hoặc</Text>
            <IconButton
              aria-label="Login with Apple"
              colorScheme="gray"
              mt={2}
              w="full"
            >
              Đăng nhập với Apple
            </IconButton>
            <IconButton
              aria-label="Login with Google"
              colorScheme="gray"
              mt={2}
              w="full"
            >
              Đăng nhập với Google
            </IconButton>
          </Flex>
          <Text fontSize="xs" color="gray.500" textAlign="center" mb={2}>
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng, Chính sách bảo mật.
          </Text>
          <Text fontSize="xs" color="gray.500" textAlign="center">
            Chưa tài khoản? <Link color="teal.500">Đăng ký tại đây</Link>
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default LoginPage;