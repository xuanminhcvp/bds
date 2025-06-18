import React from 'react';
import { Box, Heading, Text, List, ListItem, Divider, VStack, Container } from '@chakra-ui/react';

const TermsOfAgreement: React.FC = () => {
  return (
    <Container maxW="1200px" minH="100vh" py={8}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" textAlign="center" w="full">
          Điều Khoản Thỏa Thuận
        </Heading>
        <Divider />
        <Text fontSize="lg" color="gray.600">
          Việc sử dụng nền tảng của chúng tôi đồng nghĩa với việc bạn chấp nhận các điều khoản thỏa thuận dưới đây. Vui lòng đọc kỹ trước khi tham gia.
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            1. Chấp Nhận Điều Khoản
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Đồng ý:</strong> Người dùng phải đồng ý với toàn bộ điều khoản này để sử dụng dịch vụ của nền tảng.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Sửa đổi:</strong> Nền tảng có quyền cập nhật điều khoản bất kỳ lúc nào. Các thay đổi sẽ được thông báo qua email hoặc trên website.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            2. Điều Kiện Sử Dụng
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Tài khoản:</strong> Người dùng phải cung cấp thông tin chính xác khi đăng ký và chịu trách nhiệm bảo mật tài khoản.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Hành vi:</strong> Không được sử dụng nền tảng cho các mục đích bất hợp pháp, lừa đảo, hoặc gây hại cho người khác.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Nội dung:</strong> Người dùng chịu trách nhiệm về tính chính xác và hợp pháp của nội dung đăng tải.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            3. Quyền và Nghĩa Vụ của Nền Tảng
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Dịch vụ:</strong> Nền tảng cung cấp công cụ để đăng tin, tìm kiếm, và kết nối nhưng không chịu trách nhiệm về giao dịch giữa các bên.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Kiểm soát:</strong> Có quyền xóa nội dung vi phạm hoặc khóa tài khoản mà không cần thông báo trước.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Bảo mật:</strong> Cam kết bảo vệ dữ liệu người dùng theo quy định pháp luật hiện hành.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            4. Giải Quyết Tranh Chấp
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Liên hệ:</strong> Mọi tranh chấp nên được giải quyết thông qua liên hệ với nền tảng trước khi đưa ra pháp lý.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Luật áp dụng:</strong> Các tranh chấp sẽ được giải quyết theo pháp luật Việt Nam tại tòa án có thẩm quyền.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Text fontSize="md" color="gray.600">
            Nếu có câu hỏi về điều khoản, vui lòng liên hệ qua email <strong>support@example.com</strong> hoặc hotline <strong>0123 456 789</strong>.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default TermsOfAgreement;