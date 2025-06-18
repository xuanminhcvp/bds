import { VStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const GuideSection = () => {
  const navigate = useNavigate();
  return (
    <VStack align="start" gap={2}>
      <Text fontWeight="bold">Hướng dẫn</Text>
      <Link fontSize="sm" onClick={() => navigate('/about-us')} >
        Về chúng tôi
      </Link>
      <Link fontSize="sm">Báo giá và hỗ trợ</Link>
      <Link fontSize="sm">Câu hỏi thường gặp</Link>
      <Link fontSize="sm">Góp ý và bảo lỗi</Link>
      <Link fontSize="sm">Sitemap</Link>
    </VStack>
  );
};

export default GuideSection;
