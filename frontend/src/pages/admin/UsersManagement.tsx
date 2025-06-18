import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  Badge,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon, DeleteIcon } from '@chakra-ui/icons';
import useRealEstateStore from '../../stores';
import { toast } from 'sonner';

interface ToggleUserLock {
  id: string;
  is_locked: boolean;
}

const UsersManagement: React.FC = () => {
  const { allUsers, fetchAllUsers, updateUserLock, deleteUser } = useRealEstateStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const filteredUsers = allUsers?.data.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter =
      filter === 'all' ||
      (filter === 'admin' && user.is_superuser) ||
      (filter === 'user' && !user.is_superuser);
    return matchesSearch && matchesFilter;
  });

  const toggleUserLock = async (user: ToggleUserLock) => {
    try {
      await updateUserLock(user.id, !user.is_locked);
      toast.success(
        `Tài khoản ${user.is_locked ? 'đã được mở' : 'đã bị khóa'} thành công.`,
      );
    } catch (error) {
      toast.error(
        `Đã xảy ra lỗi khi ${user.is_locked ? 'mở' : 'khóa'} tài khoản`,
      );
    }
  };

  const openDeleteDialog = (userId: string) => {
    setUserIdToDelete(userId);
    onOpen();
  };

  const handleDeleteUser = async () => {
    if (userIdToDelete) {
      try {
        await deleteUser(userIdToDelete);
        toast.success('Xóa người dùng thành công.');
        onClose();
        setUserIdToDelete(null);
      } catch (error) {
        toast.error('Đã xảy ra lỗi khi xóa người dùng.');
      }
    }
  };

  return (
    <Box p={8} maxW="1400px" mx="auto" bg="white" borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="xl" mb={6} color="gray.800">
        Quản lý Người dùng
      </Heading>

      {/* Tìm kiếm và lọc */}
      <Flex mb={6} gap={4} alignItems="center">
        <Input
          placeholder="Tìm kiếm theo email hoặc tên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="400px"
          borderColor="gray.300"
          focusBorderColor="blue.500"
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          maxW="200px"
          borderColor="gray.300"
          focusBorderColor="blue.500"
        >
          <option value="all">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="user">Người dùng</option>
        </Select>
      </Flex>

      {/* Bảng người dùng */}
      <Box overflowY="auto" maxHeight="70vh" border="1px" borderColor="gray.200" borderRadius="md">
        <Table variant="simple" colorScheme="gray">
          <Thead bg="gray.50">
            <Tr>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>Tên</Th>
              <Th>Số điện thoại</Th>
              <Th>Quyền</Th>
              <Th>Số dư ví</Th>
              <Th>Ngày tạo</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers?.map((user) => (
              <Tr key={user.id} _hover={{ bg: 'gray.50' }}>
                <Td>
                  <Text fontSize="sm" color="gray.600">
                    {user.id.slice(0, 8)}...
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="sm">{user.email}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm">{user.name || 'N/A'}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm">{user.phone || 'N/A'}</Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={user.is_superuser ? 'blue' : 'green'}
                    variant="subtle"
                    px={2}
                    py={1}
                  >
                    {user.is_superuser ? 'Admin' : 'User'}
                  </Badge>
                </Td>
                <Td>
                  <Text fontSize="sm" color={(user.wallet ?? 0) > 0 ? 'green.600' : 'red.600'}>
                    {(user.wallet ?? 0).toLocaleString('vi-VN')} VND
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="sm">
                    {new Date(user.created_at).toLocaleDateString('vi-VN')}
                  </Text>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label={user.is_locked ? 'Unlock user' : 'Lock user'}
                      icon={user.is_locked ? <LockIcon /> : <UnlockIcon />}
                      size="sm"
                      colorScheme={user.is_locked ? 'red' : 'green'}
                      variant="outline"
                      onClick={() => toggleUserLock({ id: user.id, is_locked: user.is_locked })}
                    />
                    <IconButton
                      aria-label="Delete user"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => openDeleteDialog(user.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* AlertDialog xác nhận xóa */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xác nhận xóa người dùng
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UsersManagement;