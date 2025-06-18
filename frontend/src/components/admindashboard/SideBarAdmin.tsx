import { Box, VStack, Icon, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaBuilding, FaHome, FaMoneyCheckAlt, FaBell, FaChartBar, FaCog, FaPlus } from 'react-icons/fa';

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: FaChartBar, path: '/admin/dashboard' },
  { name: 'Quản lý người dùng', icon: FaUsers, path: '/admin/users' },
  { name: 'Quản lý dự án', icon: FaBuilding, path: '/admin/projects' },
  { name: 'Quản lý bất động sản', icon: FaHome, path: '/admin/properties' },
  { name: 'Tạo bài đăng', icon: FaPlus, path: '/admin/create-post' },
  { name: 'Cài đặt', icon: FaCog, path: '/admin/settings' },
];

const SidebarAdmin: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const activeColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box
      as="nav"
      bg={bg}
      w="200px"
      h="100vh"
      borderRight="1px"
      borderColor={borderColor}
      p={4}
    >
      <VStack align="start" spacing={2}>
        {sidebarItems.map((item) => (
          <Link
            as={NavLink}
            to={item.path}
            key={item.name}
            w="full"
            p={2}
            borderRadius="md"
            _hover={{ bg: 'gray.100', color: activeColor }}
            _activeLink={{ color: activeColor, fontWeight: 'bold' }}
            display="flex"
            alignItems="center"
          >
            <Icon as={item.icon} mr={3} />
            <Text>{item.name}</Text>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default SidebarAdmin;