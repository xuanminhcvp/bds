import React, { useEffect } from 'react';  
import { Box, VStack, Icon, Text, Link, useColorModeValue, HStack, Badge } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBuilding, FaProjectDiagram, FaWallet, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import useRealEstateStore from '../../stores';
import { toast } from 'sonner'; 
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const { notifications, fetchNotifications, logout } = useRealEstateStore();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((notif) => !notif.is_read).length;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công!');
    navigate('/');
  };
  const menuItems = [
    { name: 'Tổng quan', icon: FaHome, path: '/dashboard' },
    { name: 'Bất động sản', icon: FaBuilding, path: '/userproperty' },
    { name: 'Dự án', icon: FaProjectDiagram, path: '/userproject' },
    { name: 'Ví tiền', icon: FaWallet, path: '/wallet' },
    { name: 'Thông báo', icon: FaBell, path: '/notifications' },
    { name: 'Hồ sơ', icon: FaUser, path: '/userupdate' },
  ];

  return (
    <Box w="200px" h="100vh" bg={bgColor} p={4} boxShadow="md">
      <VStack spacing={4} align="start" mt={4}>
        {menuItems.map((item) => (
          <Link as={NavLink} to={item.path} key={item.name} w="full" _hover={{ textDecoration: 'none' }}>
            <HStack
              p={2}
              borderRadius="md"
              _hover={{ bg: 'teal', color: 'white' }}
              color={textColor}
              borderBottom="1px"
              borderColor="gray.300"
              align={'center'}
            >
              <Icon as={item.icon} />
              <Text
                fontWeight="normal"
                fontSize="lg"
              >
                {item.name}
              </Text>
              {item.name === 'Thông báo' && unreadCount > 0 && (
                <Badge colorScheme="red" borderRadius="full" px={2}>
                  {unreadCount}
                </Badge>
              )}
            </HStack>
          </Link>
        ))}
        <Link as={NavLink} to="/" onClick={handleLogout} w="full" _hover={{ textDecoration: 'none' }}>
          <HStack
            p={2}
            borderRadius="md"
            _hover={{ bg: 'teal', color: 'white' }}
            color={textColor}
            borderBottom="1px"
            borderColor="gray.300"
            align={'center'}
          >
            <Icon as={FaSignOutAlt} />
            <Text
              fontWeight="normal"
              fontSize="lg"
            >
              Đăng xuất
            </Text>
          </HStack>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;