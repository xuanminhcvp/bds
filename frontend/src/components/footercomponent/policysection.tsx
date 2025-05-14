import { VStack, Text, Link } from '@chakra-ui/react';

const PolicySection = () => {
    return (
      <VStack align="start" gap={2}>
        <Text fontWeight="bold">Quy định</Text>
        <Link fontSize="sm">Quy định đăng tin</Link>
        <Link fontSize="sm">Quy chế hoạt động</Link>
        <Link fontSize="sm">Điều khoản thỏa thuận</Link>
        <Link fontSize="sm">Chính sách bảo mật</Link>
        <Link fontSize="sm">Giải quyết khiếu nại</Link>
      </VStack>
    );
  };

export default PolicySection;

