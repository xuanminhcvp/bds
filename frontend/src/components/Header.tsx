import React from 'react';
import { 
  Box, 
  Flex, 
  HStack, 
  Text, 
  Link,
  Container,
  Button
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Define the navigation items with types
interface NavItem {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Nhà đất bán', href: '/nhadatban' },
    { label: 'Nhà đất cho thuê', href: '/nhadatchothue' },
    { label: 'Dự án', href: '/duan' },
    { label: 'Tin tức', href: '/tintuc' },
    { label: 'Wiki BDS', href: '/wikibds' },
    { label: 'Phân tích đánh giá', href: '/phantichdanhgia' },
    { label: 'Danh bạ', href: '/nhamoigioi' },
  ];
  
  return (
    <Box as="header" boxShadow="sm" py={3} borderBottomWidth="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          {/* Logo */}
          <Flex align="center">
            <Link as={RouterLink} to="/">
              <Flex align="center">
                <Box ml={2}>
                  <Text 
                    fontSize="xl" 
                    fontWeight="bold" 
                    color="red.500"
                    lineHeight="1.2"
                  >
                    Batdongsan
                  </Text>
                  <Text 
                    fontSize="xs" 
                    color="gray.600"
                    lineHeight="1"
                  >
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
                fontSize="md"
                fontWeight="medium"
                color="gray.700"
                _hover={{ color: 'red.500', textDecoration: 'none' }}
                _last={index === navItems.length - 1 ? { 
                  borderBottom: '2px solid', 
                  borderColor: 'red.500', 
                  color: 'red.500',
                  pb: 1 
                } : {}}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
          <HStack gap={4}>
              <Button colorScheme="teal" variant="outline">
                Tải ứng dụng
              </Button>
              <Button colorScheme="teal" variant="outline">
                Đăng nhập
              </Button>
              <Button colorScheme="teal" variant="solid">
                Đăng ký
              </Button>
              <Button colorScheme="teal" variant="solid">
                Đăng tin
              </Button>
            </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;