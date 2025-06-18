import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack, 
  Heading, 
  Text, 
  Container,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores';
import { useNavigate } from 'react-router-dom';


const LoginPageAdmin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loginAdmin } = useRealEstateStore()
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    try {
      await loginAdmin({ email, password });
      toast.success('Đăng nhập thành công');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Đăng nhập thất bại');
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="lg">
            ADMIN LOGIN
          </Heading>
          <Text textAlign="center" color="gray.600">
            Vui lòng nhập thông tin để truy cập hệ thống
          </Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    focusBorderColor="blue.500"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                mt={4}
                isLoading={false}
              >
                Đăng nhập
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPageAdmin;
