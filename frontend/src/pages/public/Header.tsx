import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Link,
  Container,
  Button,
} from '@chakra-ui/react';
import { toast } from 'sonner';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import useRealEstateStore from '../../stores';

interface NavItem {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useRealEstateStore((state) => state.user);
  const isLoadingAuth = useRealEstateStore((state) => state.isLoadingAuth);

  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Nhà đất bán', href: '/nhadatban' },
    { label: 'Nhà đất cho thuê', href: '/nhadatchothue' },
    { label: 'Dự án', href: '/duan' },
    { label: 'Tin tức', href: '/news' },
  ];

  const handleLoginClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      toast.info('Vui lòng đăng nhập để tiếp tục!');
      navigate('/login');
    }
  };

  return (
    <Box
      as="header"
      boxShadow="sm"
      py={3}
      borderBottomWidth="1px"
      borderColor="gray.200"
      top="0"
      width="100%"
      zIndex="1000"
      position="fixed"
      bg="white"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          {/* Logo */}
          <Flex align="center">
            <Link _hover={{ textDecoration: 'none' }} as={RouterLink} to="/">
              <Flex align="center">
                <Box ml={2}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="red.500"
                    lineHeight="1.2"
                  >
                    Bất Động Sản
                  </Text>
                  <Text fontSize="xs" color="gray.600" lineHeight="1">
                    by PropertyGuru
                  </Text>
                </Box>
              </Flex>
            </Link>
          </Flex>

          {/* Navigation */}
          <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                as={RouterLink}
                to={item.href}
                fontSize="small"
                fontWeight="medium"
                color={location.pathname === item.href ? 'red.500' : 'gray.700'}
                _hover={{ color: 'red.500', textDecoration: 'none' }}
                _focus={{ outline: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
          <HStack gap={4}>
            <Link
              _hover={{ textDecoration: 'none' }}
              as={RouterLink}
              to="/chooseposttype"
            >
              <Button colorScheme="teal" variant="outline">
                Đăng tin
              </Button>
            </Link>

            <Link
              _hover={{ textDecoration: 'none' }}
              as={RouterLink}
              to="/login"
            >
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={handleLoginClick}
                isLoading={isLoadingAuth}
                loadingText="Đang kiểm tra..."
              >
                Đăng nhập
              </Button>
            </Link>

            <Link
              _hover={{ textDecoration: 'none' }}
              as={RouterLink}
              to="/signup"
            >
              <Button colorScheme="teal" variant="solid">
                Đăng ký
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
