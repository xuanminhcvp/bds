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
import { FaEdit, FaTrash, FaClock, FaEye, FaUser, FaCheck } from 'react-icons/fa';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores';
import { ProjectResponse } from 'frontend/src/types/project';
import { useNavigate } from 'react-router-dom';

const AdminProject: React.FC = () => {
  const {
    projects,
    fetchProjects,
    deleteProject,
    updateProjectStatus,
    fetchTransactionsByProject,
  } = useRealEstateStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isTransactionOpen, onOpen: onTransactionOpen, onClose: onTransactionClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleDelete = async () => {
    if (selectedProjectId === null) return;
    try {
      await deleteProject(selectedProjectId);
      toast.success('Xóa dự án thành công');
      await fetchProjects();
      onClose();
    } catch (error) {
      toast.error('Xóa dự án thất bại');
    } finally {
      setSelectedProjectId(null);
    }
  };

  const handleApprovalChange = async (projectId: number) => {
    try {
      await updateProjectStatus(projectId);
      toast.success('Cập nhật trạng thái phê duyệt thành công');
      await fetchProjects();
    } catch (error) {
      toast.error('Cập nhật trạng thái phê duyệt thất bại');
    }
  };

  const handleViewTransactions = async (projectId: number, project: ProjectResponse) => {
    try {
      const transactionsData = await fetchTransactionsByProject(projectId);
      setTransactions(transactionsData);
      setSelectedProject(project);
      onTransactionOpen();
    } catch (error) {
      toast.error('Không thể tải giao dịch');
    }
  };

  const openDeleteDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    onOpen();
  };

  const filteredProjects = projects.filter((project: ProjectResponse) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  return (
    <Container maxW="container.xl" py={6} overflowY="auto" maxH="90vh">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" marginBottom={4}>
          Quản lý dự án
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
              <option value="ongoing">Đang tiến hành</option>
              <option value="completed">Hoàn thành</option>
            </Select>
          </FormControl>
        </HStack>

        {paginatedProjects.length === 0 ? (
          <Text textAlign="center">Không có dự án nào.</Text>
        ) : (
          paginatedProjects.map((project: ProjectResponse) => (
            <Box
              key={project.project_id}
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
                  {project.images.length > 0 ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      maxH="200px"
                      objectFit="cover"
                      borderRadius="md"
                    />
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

                {/* Thông tin dự án */}
                <VStack align="start" flex="2" spacing={2}>
                  <HStack>
                    <Text textColor={'teal.600'}>#{project.project_id}</Text>
                    <Tag colorScheme={project.is_approved ? 'green' : 'red'}>
                      {project.is_approved ? 'Đã phê duyệt' : 'Chưa phê duyệt'}
                    </Tag>
                  </HStack>
                  <Text fontWeight="bold" fontSize="lg">{project.title}</Text>
                  <Text>Diện tích: {project.area} m²</Text>
                  <Text>Địa chỉ: {project.address}</Text>
                  <Text>Trạng thái: {project.status}</Text>
                  <Text>Công ty: {project.company}</Text>
                  <Text>Ngày tạo: {formatDate(project.created_at)}</Text>
                  <Text>Người đăng: {project.user.name} - {project.user.email}</Text>
                </VStack>

                {/* Hành động */}
                <VStack align="end" spacing={2}>
                  {!project.is_approved && (
                    <Tooltip label="Phê duyệt dự án">
                      <IconButton
                        aria-label="Phê duyệt dự án"
                        icon={<FaCheck />}
                        colorScheme="green"
                        onClick={() => handleApprovalChange(project.project_id)}
                      />
                    </Tooltip>
                  )}
                  <Tooltip label="Chỉnh sửa">
                    <IconButton
                      aria-label="Chỉnh sửa dự án"
                      icon={<FaEdit />}
                      colorScheme="teal"
                      onClick={() => navigate(`/admin/projects/edit/${project.project_id}`)}
                    />
                  </Tooltip>
                  <Tooltip label="Xóa">
                    <IconButton
                      aria-label="Xóa dự án"
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => openDeleteDialog(project.project_id)}
                    />
                  </Tooltip> 
                  <Tooltip label="Xem giao dịch">
                    <IconButton
                      aria-label="Xem giao dịch"
                      icon={<FaEye />}
                      colorScheme="purple"
                      onClick={() => handleViewTransactions(project.project_id, project)}
                    />
                  </Tooltip>
                  <Tooltip label="Xem thông tin người đăng">
                    <IconButton
                      aria-label="Xem người đăng"
                      icon={<FaUser />}
                      colorScheme="gray"
                      onClick={() => navigate(`/admin/users/${project.user.id}`)}
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
          setSelectedProjectId(null);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa dự án
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc muốn xóa dự án này? Hành động này không thể hoàn tác.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  setSelectedProjectId(null);
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
          <ModalHeader>Giao dịch của dự án #{selectedProject?.project_id}</ModalHeader>
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
    </Container>
  );
};

export default AdminProject;