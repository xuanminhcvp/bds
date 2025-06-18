import { VStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PolicySection = () => {
  const navigate = useNavigate();
  return (
    <VStack align="start" gap={2}>
      <Text fontWeight="bold">Quy định</Text>
      <Link fontSize="sm" onClick={() => navigate('/posting-rules')}>
        Quy định đăng tin
      </Link>
      <Link fontSize="sm" onClick={() => navigate('/operating-regulations')}>
        Quy chế hoạt động
      </Link>
      <Link fontSize="sm" onClick={() => navigate('/terms-of-agreement')}>
        Điều khoản thỏa thuận
      </Link>
      <Link fontSize="sm" onClick={() => navigate('/privacy-policy')}>
        Chính sách bảo mật
      </Link>
      <Link fontSize="sm" onClick={() => navigate('/complaint-resolution')}>
        Giải quyết khiếu nại
      </Link>
    </VStack>
  );
};

export default PolicySection;
