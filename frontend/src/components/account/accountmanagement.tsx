import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import axios from "axios";

const AccountManagement = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/users/me');
            setPersonalInfo({
              fullName: response.data.full_name || 'Xuan Minh',
              phone: response.data.phone || '0964660275',
              email: response.data.email || 'xuanminhcvp@gmail.com',
            });
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
          }
        };
        fetchUserData();
      }, []);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update user data
  const handleSubmit = async () => {
        const payload = {
          full_name: personalInfo.fullName,
          phone: personalInfo.phone,
        };
        console.log('Data sent to API:', payload);
        try {
          const response = await axios.patch('http://127.0.0.1:8000/api/v1/users/me', payload);
          if (response.status === 200) {
            alert('Thông tin đã được cập nhật!');
          } else {
            alert('Cập nhật thất bại.');
          }
        } catch (error) {
          console.error('Error updating user data:', error);
          alert('Đã xảy ra lỗi khi cập nhật.');
        }
      };

  if (isLoading) {
    return <Box p={6}>Đang tải...</Box>;
  }

  return (
    <Box p={6} maxW="600px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Quản lý tài khoản
      </Text>
      <Stack spacing={4}>
        <HStack>
          <Avatar
            size="xl"
            name={personalInfo.fullName}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          />
        </HStack>

        <Stack as="form" spacing={4}>
          <FormControl isRequired>
            <FormLabel>Họ và tên</FormLabel>
            <Input
              name="fullName"
              value={personalInfo.fullName}
              onChange={handleChange}
              placeholder="Họ và tên"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder="Email"
              isDisabled={true}
            />
          </FormControl>
        </Stack>
      </Stack>
      <HStack spacing={4} mb={6} mt={6}>
        <Button colorScheme="red" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </HStack>
    </Box>
  );
};

export default AccountManagement;