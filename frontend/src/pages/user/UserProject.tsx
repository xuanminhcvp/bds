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
  FormHelperText,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores/index.ts';
import { ProjectResponse } from '../../types/project.ts';

const UserProject: React.FC = () => {
  const { userproject, getProjectByUser, deleteProject, extendProject, createNotification, paymentTransactionsProject, payment } = useRealEstateStore();
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const { isOpen: isExtendOpen, onOpen: onExtendOpen, onClose: onExtendClose } = useDisclosure(); 
  const cancelRef = useRef<HTMLButtonElement>(null);
  const extendCancelRef = useRef<HTMLButtonElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [extendDays, setExtendDays] = useState<string>(''); 
  const [extendProjectId, setExtendProjectId] = useState<number | null>(null); 

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const PRICE_PER_DAY = 5000; 

  useEffect(() => {
    getProjectByUser();
  }, [getProjectByUser]);

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
      await getProjectByUser();
      onClose();
    } catch (error) {
      toast.error('Xóa dự án thất bại');
    } finally {
      setSelectedProjectId(null);
    }
  };

  const handleExtend = async () => {
    if (extendProjectId === null || !extendDays) return;
    const days = parseInt(extendDays, 10);

    if (isNaN(days) || days <= 0) {
      toast.error('Vui lòng nhập số ngày hợp lệ');
      return;
    }
    const amount = days * PRICE_PER_DAY; 
    try {
      await extendProject(extendProjectId, days);
      toast.success('Gia hạn dự án thành công');
      await getProjectByUser();
      await createNotification(`Dự án ID ${extendProjectId} đã được gia hạn ${days} ngày với tổng số tiền ${amount.toLocaleString('vi-VN')} VND`);
      await paymentTransactionsProject({
        amount: amount,
        transaction_type: 'payment',
        project_id: extendProjectId,
      });
      await payment(amount);
      onExtendClose();
    } catch (error) {
      toast.error('Gia hạn dự án thất bại, vui lòng kiểm tra số dư ví của bạn');
    } finally {
      setExtendDays('');
      setExtendProjectId(null);
    }
  };

  const openDeleteDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    onOpen();
  };

  const openExtendDialog = (projectId: number) => {
    setExtendProjectId(projectId);
    onExtendOpen();
  };

  return (
    <Container maxW="container.xl" py={6} overflowY="auto" maxH="90vh">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" marginBottom={4}>
          Dự án của bạn
        </Heading>
        {userproject.length === 0 ? (
          <Text textAlign="center">Không có dự án nào.</Text>
        ) : (
          userproject.map((project) => (
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
                  <Text textColor={'teal.600'}>#{project.project_id}</Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {project.title}
                  </Text>
                  <Text>Diện tích: {project.area} m²</Text>
                  <Text>Địa chỉ: {project.address}</Text>
                  <Text>Trạng thái: {project.status}</Text>
                  <Text>Công ty: {project.company}</Text>
                  <Text>Hết hạn: {formatDate(project.expires_at)}</Text>
                  <Text>Đã phê duyệt: {project.is_approved ? 'Có' : 'Không'}</Text>
                </VStack>

                {/* Hành động */}
                <VStack align="end" spacing={2}>
                  <IconButton
                    aria-label="Chỉnh sửa dự án"
                    icon={<FaEdit />}
                    colorScheme="teal"
                    onClick={() => {
                      /* Logic edit */
                    }}
                  />
                  <IconButton
                    aria-label="Xóa dự án"
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => openDeleteDialog(project.project_id)}
                  />
                  <IconButton
                    aria-label="Gia hạn dự án"
                    icon={<FaClock />}
                    colorScheme="blue"
                    onClick={() => openExtendDialog(project.project_id)}
                  />
                </VStack>
              </Flex>
            </Box>
          ))
        )}
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

      {/* AlertDialog for Extend Confirmation */}
      <AlertDialog
        isOpen={isExtendOpen}
        leastDestructiveRef={extendCancelRef}
        onClose={() => {
          onExtendClose();
          setExtendDays('');
          setExtendProjectId(null);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Gia hạn dự án
            </AlertDialogHeader>
            <AlertDialogBody>
              <FormControl>
                <FormLabel>Nhập số ngày gia hạn</FormLabel>
                <Input
                  type="number"
                  value={extendDays}
                  onChange={(e) => setExtendDays(e.target.value)}
                  placeholder="Nhập số ngày"
                  min={1}
                />
                <FormHelperText>
                  Giá: 5000đ/tin/ngày
                </FormHelperText>
              </FormControl>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={extendCancelRef}
                onClick={() => {
                  onExtendClose();
                  setExtendDays('');
                  setExtendProjectId(null);
                }}
              >
                Hủy
              </Button>
              <Button colorScheme="blue" onClick={handleExtend} ml={3}>
                Gia hạn
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default UserProject;