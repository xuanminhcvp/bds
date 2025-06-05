import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, VStack, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores';

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState('');

  const userProfile = useRealEstateStore((state) => state.userProfile);
  const fetchUserProfile = useRealEstateStore((state) => state.fetchUserProfile);
  const wallet = useRealEstateStore((state) => state.wallet);
  const fetchWallet = useRealEstateStore((state) => state.fetchWallet);
  const deposit = useRealEstateStore((state) => state.deposit);
  const isLoadingWallet = useRealEstateStore((state) => state.isLoadingWallet);
  const errorWallet = useRealEstateStore((state) => state.errorWallet);
  const isFetchedUser = useRealEstateStore((state) => state.isFetchedUser);
  const isFetchedWallet = useRealEstateStore((state) => state.isFetchedWallet);

  useEffect(() => {
    if (!isFetchedUser) fetchUserProfile();
    if (!isFetchedWallet) fetchWallet();
  }, [isFetchedUser, isFetchedWallet, fetchUserProfile, fetchWallet]);

  const handleGoHome = () => {
    navigate('/');
  };

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
      await fetchWallet();
    } else {
      toast.error(result.error || 'Nạp tiền thất bại, vui lòng thử lại', {
        duration: 3000,
      });
    }
  };

  if (isLoadingWallet) return <Box>Loading...</Box>;
  if (errorWallet) return <Box>{errorWallet}</Box>;

  const baseURL = "http://localhost:8000"
  const imagePathFromDB = userProfile?.avatar
  const fullAvatarURL = `${baseURL}${imagePathFromDB}`

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md" maxW="sm" mx="auto">
      <Flex align="center" mb={4}>
        <Avatar name={userProfile?.name || 'User'} src={fullAvatarURL}  size="md" mr={3} />
        <Box>
          <Text fontWeight="bold">{userProfile?.name || 'UserName'}</Text>
        </Box>
      </Flex>

      <Button leftIcon={<FiHome />} variant="outline" w="full" mb={4} onClick={handleGoHome}>
        Chuyển về trang chủ
      </Button>

      <Text fontWeight="bold" mb={2}>Số dư tài khoản</Text>
      <VStack spacing={2} align="start" mb={4}>
        <Text>TK tín dụng: {wallet.balance} VNĐ</Text>
      </VStack>
      <Button
        colorScheme="blackAlpha"
        w="full"
        leftIcon={<span>💳</span>}
        onClick={onOpen}
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
            <Button colorScheme="blue" mr={3} onClick={handleDeposit}>
              Xác nhận
            </Button>
            <Button variant="ghost" onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Wallet;