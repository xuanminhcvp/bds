import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

interface PhoneConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneConfirmationModal: React.FC<PhoneConfirmationModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = () => {
    // Add confirmation logic here
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Xác thực số điện thoại</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Bạn vui lòng xác thực số điện thoại để tiếp tục đăng tin</Text>
          <Text mb={2}>Số điện thoại</Text>
          <Input
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            mb={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
            Lấy mã xác thực
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhoneConfirmationModal;