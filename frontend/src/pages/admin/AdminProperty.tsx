import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Container,
  Image,
  Stack,
  Flex,
  IconButton,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Select,
  HStack,
  Tag,
  Tooltip,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaEye, FaUser } from 'react-icons/fa';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores';
import { useNavigate } from 'react-router-dom';

const AdminProperty: React.FC = () => {
  const {
    property,
    fetchProperty,
    deleteProperty,
    updatePropertyStatus,
    fetchTransactionByPropertyId,
  } = useRealEstateStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isTransactionOpen, onOpen: onTransactionOpen, onClose: onTransactionClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const { isOpen: isUserOpen, onOpen: onUserOpen, onClose: onUserClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const ITEMS_PER_PAGE = 10;

  const count_pending = property.filter((item) => item.status === 'pending').length;

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleDelete = async () => {
    if (selectedPropertyId === null) return;
    try {
      await deleteProperty(selectedPropertyId);
      toast.success('Xóa bất động sản thành công');
      await fetchProperty();
      onClose();
    } catch (error) {
      toast.error('Xóa bất động sản thất bại');
    } finally {
      setSelectedPropertyId(null);
    }
  };

  const handleStatusChange = async (propertyId: number, newStatus: string) => {
    try {
      await updatePropertyStatus(propertyId, newStatus);
      toast.success('Cập nhật trạng thái thành công');
      await fetchProperty();
    } catch (error) {
      toast.error('Cập nhật trạng thái thất bại');
    }
  };

  const handleViewTransactions = async (propertyId: number, property: any) => {
    try {
      const transactionsData = await fetchTransactionByPropertyId(propertyId);
      setTransactions(transactionsData);
      setSelectedProperty(property);
      onTransactionOpen();
    } catch (error) {
      toast.error('Không thể tải giao dịch');
    }
  };

  const openDeleteDialog = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    onOpen();
  };

  const handleViewUser = (user: any) => {
  setSelectedUser(user);
  onUserOpen();
};

  const filteredProperties = property.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.property_type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  })
  .sort((a, b) => {
    type StatusKey = 'pending' | 'approved' | 'expired' | 'rejected';
    const order: Record<StatusKey, number> = { pending: 1, approved: 2, expired: 3, rejected: 4 };
    return order[a.status as StatusKey] - order[b.status as StatusKey];
  });

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  return (
    <Container maxW="container.xl" py={6} overflowY="auto" maxH="90vh">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" marginBottom={4}>
          Quản lý bất động sản
        </Heading>

        {/* Search and Filter */}
        <HStack spacing={4} mb={4}>
          <FormControl>
            <FormLabel>Tìm kiếm</FormLabel>
            <Input
              placeholder="Tìm theo tiêu đề"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Trạng thái</FormLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Từ chối</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Loại bất động sản</FormLabel>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="sale">Bán</option>
              <option value="rent">Cho thuê</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Danh mục</FormLabel>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="house">Nhà ở</option>
              <option value="apartment">Căn hộ</option>
              <option value="land">Đất</option>
              <option value="villa">Biệt thự</option>
            </Select>
          </FormControl>
        </HStack> 
        <Text fontWeight="bold">
          Số lượng BDS chờ duyệt: {count_pending}
        </Text>
        {paginatedProperties.length === 0 ? (
          <Text textAlign="center">Không có bất động sản nào.</Text>
        ) : (
          paginatedProperties.map((property) => (
            <Box
              key={property.property_id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="md"
              bg={bgColor}
              borderColor={borderColor}
            >
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                {/* Hình ảnh */}
                <Stack spacing={2} flex="1" maxW={{ base: '100%', md: '200px' }} marginRight={4}>
                  {property.images.length > 0 ? (
                    <Box>
                      {/* Ảnh lớn */}
                      <Image
                        src={property.images[0].image_url}
                        alt={property.title}
                        maxH="200px"
                        w="100%"
                        objectFit="cover"
                        borderRadius="md"
                        mb={2} // Margin bottom để cách ảnh nhỏ
                      />
                      {/* Hai ảnh nhỏ */}
                      {property.images.length > 1 && (
                        <Flex gap={2}>
                          <Image
                            src={property.images[1]?.image_url || "placeholder.jpg"} // Ảnh placeholder nếu không đủ ảnh
                            alt={property.title}
                            maxH="100px"
                            w="50%"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <Image
                            src={property.images[2]?.image_url || "placeholder.jpg"} // Ảnh placeholder nếu không đủ ảnh
                            alt={property.title}
                            maxH="100px"
                            w="50%"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        </Flex>
                        )}
                      </Box>
                    ) : (
                      <Box
                        maxH="200px"
                        bg="gray.200"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text>Không có hình ảnh</Text>
                      </Box>
                    )}
                </Stack>

                {/* Thông tin bất động sản */}
                <VStack align="start" flex="2" spacing={2}>
                  <HStack>
                    <Text textColor={'teal.600'}>#{property.property_id}</Text>
                    <Tag colorScheme={property.status === 'approved' ? 'green' : property.status === 'rejected' ? 'red' : 'yellow'}>
                      {property.status}
                    </Tag>
                  </HStack>
                  <Text fontWeight="bold" fontSize="lg">{property.title}</Text>
                  <Text>Giá: {property.price.toLocaleString('vi-VN')} VND</Text>
                  <Text>Diện tích: {property.area} m²</Text>
                  <Text>Địa chỉ: {property.address}</Text>
                  <Text>Loại: {property.property_type}</Text>
                  <Text>Danh mục: {property.category}</Text>
                  <Text>Lượt xem: {property.views}</Text>
                  <Text>Hết hạn: {formatDate(property.expires_at)}</Text>
                  <Text>Người đăng: {property.user.name} ({property.user.email})</Text>
                </VStack>

                {/* Hành động */}
                <VStack align="end" spacing={2}>
                  <Select
                    size="sm"
                    value={property.status}
                    onChange={(e) => handleStatusChange(property.property_id, e.target.value)}
                  >
                    <option value="pending">Chờ duyệt</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="rejected">Từ chối</option>
                  </Select>
                  <Tooltip label="Chỉnh sửa">
                    <IconButton
                      aria-label="Chỉnh sửa bất động sản"
                      icon={<FaEdit />}
                      colorScheme="teal"
                      onClick={() => navigate(`/admin/properties/edit/${property.property_id}`)}
                    />
                  </Tooltip>
                  <Tooltip label="Xóa">
                    <IconButton
                      aria-label="Xóa bất động sản"
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => openDeleteDialog(property.property_id)}
                    />
                  </Tooltip>
                  <Tooltip label="Xem giao dịch">
                    <IconButton
                      aria-label="Xem giao dịch"
                      icon={<FaEye />}
                      colorScheme="purple"
                      onClick={() => handleViewTransactions(property.property_id, property)}
                    />
                  </Tooltip>
                  <Tooltip label="Xem thông tin người đăng">
                    <IconButton
                      aria-label="Xem người đăng"
                      icon={<FaUser />}
                      colorScheme="gray"
                      onClick={() => handleViewUser(property.user)}
                    />
                  </Tooltip>
                </VStack>
              </Flex>
            </Box>
          ))
        )}

        {/* Pagination */}
        <HStack justify="center" mt={4}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Trước
          </Button>
          <Text>Trang {currentPage} / {totalPages}</Text>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Sau
          </Button>
        </HStack>
      </VStack>

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          onClose();
          setSelectedPropertyId(null);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa bất động sản
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc muốn xóa bất động sản này? Hành động này không thể hoàn tác.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  setSelectedPropertyId(null);
                }}
              >
                Hủy
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Modal for Transaction Details */}
      <Modal isOpen={isTransactionOpen} onClose={onTransactionClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Giao dịch của bất động sản #{selectedProperty?.property_id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {transactions.length === 0 ? (
              <Text>Không có giao dịch nào.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Loại</Th>
                    <Th>Số tiền</Th>
                    <Th>Ngày tạo</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map((transaction) => (
                    <Tr key={transaction.transaction_id}>
                      <Td>{transaction.transaction_id}</Td>
                      <Td>{transaction.transaction_type}</Td>
                      <Td>{transaction.amount.toLocaleString('vi-VN')} VND</Td>
                      <Td>{formatDate(transaction.created_at)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onTransactionClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUserOpen} onClose={onUserClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông tin người đăng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser ? (
              <VStack align="start" spacing={4}>
                <Text><b>ID:</b> {selectedUser.id}</Text>
                <Text><b>Tên:</b> {selectedUser.name}</Text>
                <Text><b>Email:</b> {selectedUser.email}</Text>
                <Text><b>Số điện thoại:</b> {selectedUser.phone}</Text>
              </VStack>
            ) : (
              <Text>Không có thông tin người dùng.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onUserClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminProperty;