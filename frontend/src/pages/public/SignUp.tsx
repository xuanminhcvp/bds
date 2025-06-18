import { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useRealEstateStore from '../../stores';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const SignUpPage: React.FC = () => {
  const { register, isLoadingAuth, errorAuth, logout } = useRealEstateStore();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logout();
    try {
      const result = await register(formData);
      if (result.success) {
        toast.success('Register successfully, please login to continue');
        navigate('/login');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(errorAuth);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      mb={6}
    >
      <Heading mb={6} textAlign="center">
        Đăng ký tài khoản
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <FormControl isRequired>
            <FormLabel>Họ và tên</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên"
              isDisabled={isLoadingAuth}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              isDisabled={isLoadingAuth}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Mật khẩu</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              isDisabled={isLoadingAuth}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Số Điện Thoại</FormLabel>
            <Input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              isDisabled={isLoadingAuth}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isLoadingAuth}
            loadingText="Đang đăng ký..."
          >
            Đăng ký
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUpPage;
