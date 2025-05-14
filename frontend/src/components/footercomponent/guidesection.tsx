import { VStack, Text, Link } from '@chakra-ui/react';

const GuideSection = () => {
    return (
      <VStack align="start" gap={2}>
        <Text fontWeight="bold">Hướng dẫn</Text>
        <Link fontSize="sm">Về chúng tôi</Link>
        <Link fontSize="sm">Báo giá và hỗ trợ</Link>
        <Link fontSize="sm">Câu hỏi thường gặp</Link>
        <Link fontSize="sm">Góp ý và bảo lỗi</Link>
        <Link fontSize="sm">Sitemap</Link>
      </VStack>
    );
  };

export default GuideSection;