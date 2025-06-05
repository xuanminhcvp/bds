import { useState, useEffect } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Text } from '@chakra-ui/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useRealEstateStore from '../../stores';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Lấy dữ liệu từ useRealEstateStore
  const user = useRealEstateStore((state) => state.user);
  const isLoadingAuth = useRealEstateStore((state) => state.isLoadingAuth);
  const login = useRealEstateStore((state) => state.login);
  const errorAuth = useRealEstateStore((state) => state.errorAuth);

  useEffect(() => {
    if ( user) {
      navigate('/dashboard');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      toast.error('Bạn đã đăng nhập. Vui lòng đăng xuất trước khi đăng nhập lại.');
      return;
    }
    if (!formData.email || !formData.password) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const result = await login({ email: formData.email, password: formData.password });
    if (result.success) {
      toast.success('Đăng nhập thành công!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Email hoặc mật khẩu không đúng.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" mb={6}>
          <Heading mb={6} textAlign="center">
            Đăng nhập
          </Heading>
          {errorAuth && <Text color="red.500">{errorAuth}</Text>}
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  isDisabled={isLoadingAuth}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                isLoading={isLoadingAuth}
                loadingText="Đang đăng nhập..."
              >
                Đăng nhập
              </Button>
            </VStack>
          </form>
    </Box>
  );
};

export default Login;