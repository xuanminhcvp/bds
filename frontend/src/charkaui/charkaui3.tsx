// File: UserList.tsx
import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  VStack,
  SimpleGrid,
  Button,
  defaultSystem,
} from '@chakra-ui/react';

// Định nghĩa interface cho dữ liệu người dùng
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Dữ liệu mẫu
const users: User[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'Admin' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'User' },
  { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'Editor' },
];

// Component hiển thị thông tin một người dùng
const UserCard: React.FC<User> = ({ name, email, role }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4} // Padding
      bg="white"
      boxShadow="sm"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }} // Hiệu ứng hover
      transition="all 0.2s"
    >
      <VStack gap={2} align="start">
        <Heading size="sm" color="blue.600">
          {name}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Email: {email}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Vai trò: {role}
        </Text>
        <Button size="sm" colorScheme="blue" variant="outline">
          Xem chi tiết
        </Button>
      </VStack>
    </Box>
  );
};

// Component chính
const UserList: React.FC = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Box
        minH="100vh"
        p={6} // Padding cho toàn bộ trang
        bg="gray.500"
      >
        <Heading mb={6} textAlign="center" color="teal.600">
          Danh sách người dùng
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }} // Responsive: 1 cột trên mobile, 2 trên medium, 3 trên large
          gap={6} // Khoảng cách giữa các card
          maxW="1200px"
          mx="auto" // Căn giữa
        >
          {users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              id={user.id}
              email={user.email}
              role={user.role}
            />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};

export default UserList;