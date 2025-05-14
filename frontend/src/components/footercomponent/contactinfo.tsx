import { Text, VStack } from '@chakra-ui/react';

const ContactInfo = () => {
    return (
      <VStack align="start" gap={2}>
        <Text fontSize="xs">
          Chương trình mời dùng GCP: Bà Đặng Thị Hương
        </Text>
        <Text fontSize="xs">
          Ông Bắc Đương
        </Text>
        <Text fontSize="xs">
          Quy chế, quy định giao dịch có hiệu lực từ 08/08/2023
        </Text>
        <Text fontSize="xs">
          Ghi rõ nguồn "Batdongsan.com.vn" khi phát hành lại thông tin từ website này.
        </Text>
      </VStack>
    );
};

export default ContactInfo;