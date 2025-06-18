import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from '@chakra-ui/react';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores';
import { useDisclosure } from '@chakra-ui/react';

const WalletDashboard: React.FC = () => {
  const { wallet, transactions, fetchWallet, fetchUserTransactions, deposit, depositTransactions, createNotification } = useRealEstateStore()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchWallet();
        await fetchUserTransactions();
      } catch (error) {
        toast.error('Không thể tải dữ liệu');
      }
    };

    fetchData();
  }
  , [fetchWallet, fetchUserTransactions]);

  const handleDeposit = async () => {
      const depositAmount = Number(amount);
      if (!amount || isNaN(depositAmount) || depositAmount <= 0) {
        toast.error('Vui lòng nhập số tiền hợp lệ', {
          duration: 3000,
        });
        return;
      }
  
      const result = await deposit(depositAmount);
      if (result.success) {
        toast.success('Nạp tiền thành công!', {
          duration: 3000,
        });
        setAmount('');
        onClose();
        depositTransactions({
          amount: depositAmount,
          transaction_type: 'deposit',
        });
        
        await fetchWallet();
        await fetchUserTransactions();
        await createNotification(
            `Bạn đã nạp ${depositAmount.toLocaleString('vi-VN')} VND vào ví.`,
        );
      } else {
        toast.error(result.error || 'Nạp tiền thất bại, vui lòng thử lại', {
          duration: 3000,
        });
      }
    };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Ví của bạn
        </Heading>
          {/* Hiển thị số dư ví */}
          <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" minW={300} mx="auto" textAlign="center">
            <Text fontSize="lg" fontWeight="bold">
              Số dư hiện tại:
            </Text>
            <Text fontSize="2xl" color="green.500">
              {wallet?.balance.toLocaleString('vi-VN')} VND
            </Text>
            <Button
                colorScheme="teal"
                w="full"
                leftIcon={<span>💳</span>}
                onClick={onOpen}
                mt={4}
            >
                Nạp Tiền
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Nhập số tiền nạp</ModalHeader>
                <ModalBody>
                  <Input
                    placeholder="Số tiền (VD: 100000)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3} onClick={handleDeposit}>
                    Xác nhận
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Hủy
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>

          {/* Lịch sử giao dịch */}
          <Box overflowY="auto" maxHeight="50vh">
            <Heading as="h2" size="md" mb={4}>
              Lịch sử giao dịch
            </Heading>
            {transactions.length === 0 ? (
              <Text>Chưa có giao dịch nào.</Text>
            ) : (
              <Table variant="simple" size="md" overflowY="auto">
                <Thead>
                  <Tr>
                    <Th>Ngày</Th>
                    <Th>Loại giao dịch</Th>
                    <Th>Số tiền</Th>
                    <Th>Property title</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                {[...transactions] 
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) 
                  .map((transaction, index) => (
                    <Tr key={index}>
                      <Td>{formatDate(transaction.created_at)}</Td>
                      <Td color={transaction.transaction_type === 'deposit' ? 'green.500' : 'red.500'}>
                        {transaction.transaction_type}
                      </Td>
                      <Td color={transaction.transaction_type === 'deposit' ? 'green.500' : 'red.500'}>
                        {transaction.amount.toLocaleString('vi-VN')} VND
                      </Td>
                      <Td>{transaction.title}</Td>
                      <Td>{transaction.description}</Td>
                    </Tr>
                  ))}
              </Table>
            )}
          </Box>
      </VStack>
    </Container>
  );
};

export default WalletDashboard;