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
import useRealEstateStore from '../../stores';

const UserProperty: React.FC = () => {
  const { userproperty, fetchPropertyByUser, deleteProperty, extendProperty, createNotification, paymentTransactions, payment } = useRealEstateStore();
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const { isOpen: isExtendOpen, onOpen: onExtendOpen, onClose: onExtendClose } = useDisclosure(); 
  const cancelRef = useRef<HTMLButtonElement>(null);
  const extendCancelRef = useRef<HTMLButtonElement>(null);
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<number | null>(null);
  const [extendDays, setExtendDays] = useState<string>(''); 
  const [extendPropertyId, setExtendPropertyId] = useState<number | null>(null); 

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const PRICE_PER_DAY = 5000; 

  useEffect(() => {
    fetchPropertyByUser();
  }, [fetchPropertyByUser]);

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
      await fetchPropertyByUser()
      onClose();
    } catch (error) {
      toast.error('Xóa bất động sản thất bại');
    } finally {
      setSelectedPropertyId(null);
    }
  };

  const handleExtend = async () => {
    if (extendPropertyId === null || !extendDays) return;
    const days = parseInt(extendDays, 10);

    if (isNaN(days) || days <= 0) {
      toast.error('Vui lòng nhập số ngày hợp lệ');
      return;
    }
    const amount = days * PRICE_PER_DAY; 
    try {
      await extendProperty(extendPropertyId, days);
      toast.success('Gia hạn bất động sản thành công');
      await fetchPropertyByUser();
      await createNotification(`Bất động sản ID ${extendPropertyId} đã được gia hạn ${days} ngày với tổng số tiền ${amount.toLocaleString('vi-VN')} VND`);
      await paymentTransactions({
        amount: amount,
        transaction_type: 'payment',
        property_id: extendPropertyId,
      });
      await payment(amount);
      onExtendClose();
    } catch (error) {
      toast.error('Gia hạn bất động sản thất bại, vui lòng kiểm tra số dư ví của bạn');
    } finally {
      setExtendDays('');
      setExtendPropertyId(null);
    }
  };

  const openDeleteDialog = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    onOpen();
  };

  const openExtendDialog = (propertyId: number) => {
    setExtendPropertyId(propertyId);
    onExtendOpen();
  };

  return (
    <Container maxW="container.xl" py={6} overflowY="auto" maxH="90vh">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" marginBottom={4}>
          Bất động sản của bạn 
        </Heading>
        {userproperty.length === 0 ? (
          <Text textAlign="center">Không có bất động sản nào.</Text>
        ) : (
          userproperty.map((property) => (
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
                    <Image
                      src={property.images[0].image_url}
                      alt={property.title}
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

                {/* Thông tin bất động sản */}
                <VStack align="start" flex="2" spacing={2}>
                  <Text textColor={'teal.600'}>#{property.property_id}</Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {property.title}
                  </Text>
                  <Text>Giá: {property.price.toLocaleString('vi-VN')} VND</Text>
                  <Text>Diện tích: {property.area} m²</Text>
                  <Text>Địa chỉ: {property.address}</Text>
                  <Text>Trạng thái: {property.status}</Text>
                  <Text>Lượt xem: {property.views}</Text>
                  <Text>Hết hạn: {formatDate(property.expires_at)}</Text>
                </VStack>

                {/* Hành động */}
                <VStack align="end" spacing={2}>
                  <IconButton
                    aria-label="Chỉnh sửa bất động sản"
                    icon={<FaEdit />}
                    colorScheme="teal"
                    onClick={() => {
                      /* Logic edit */
                    }}
                  />
                  <IconButton
                    aria-label="Xóa bất động sản"
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => openDeleteDialog(property.property_id)}
                  />
                  <IconButton
                    aria-label="Gia hạn bất động sản"
                    icon={<FaClock />}
                    colorScheme="blue"
                    onClick={() => openExtendDialog(property.property_id)}
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

      {/* AlertDialog for Extend Confirmation */}
      <AlertDialog
        isOpen={isExtendOpen}
        leastDestructiveRef={extendCancelRef}
        onClose={() => {
          onExtendClose();
          setExtendDays('');
          setExtendPropertyId(null);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Gia hạn bất động sản
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
                  setExtendPropertyId(null);
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

export default UserProperty;