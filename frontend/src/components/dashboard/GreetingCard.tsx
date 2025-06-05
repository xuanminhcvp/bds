import { useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spinner
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores';
export default function GreetingCard() {
  const navigate = useNavigate();

  const userProfile = useRealEstateStore((state) => state.userProfile);
  const fetchUserProfile = useRealEstateStore((state) => state.fetchUserProfile);
  const logout = useRealEstateStore((state) => state.logout);
  const errorUser = useRealEstateStore((state) => state.errorUser);
  const isLoadingUser = useRealEstateStore((state) => state.isLoadingUser);
  const isFetchedUser = useRealEstateStore((state) => state.isFetchedUser);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]); 
  
  if (isLoadingUser && !userProfile) {
    return (
      <Flex align="center" justify="center" minH="80px">
        <Spinner size="sm" />
        <Text ml={2} fontSize="sm" color="gray.500">
          Đang tải...
        </Text>
      </Flex>
    );
  }

  if (!userProfile && !isLoadingUser && isFetchedUser) {
    return (
      <Text color="red.500" fontSize="sm">
        {errorUser || 'Không thể tải thông tin người dùng.'}
      </Text>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công!');
    navigate('/');
  };

  const handleAccountManagement = () => {
    navigate('/account');
  };

  if (!userProfile) {
    return null; 
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        padding="0"
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
      >
        <Flex align="center" gap={2}>
          <Box textAlign="left">
            <Text fontSize="sm" color="gray.500">
              Xin chào
            </Text>
            <Flex align="center" gap={1}>
              <Text fontWeight="bold" fontSize="md">
                {userProfile.name}
              </Text>
              <Text fontSize="lg" fontWeight="medium" color="gray.600">
                {'>'}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </MenuButton>

      <MenuList>
        <MenuItem onClick={handleAccountManagement}>Quản lý tài khoản</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </MenuList>
    </Menu>
  );
}