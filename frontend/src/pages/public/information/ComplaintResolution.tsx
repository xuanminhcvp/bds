import React from 'react';
import { Box, Heading, Text, List, ListItem, Divider, VStack, Container } from '@chakra-ui/react';

const ComplaintResolution: React.FC = () => {
  return (
    <Container maxW="1200px" minH="100vh" py={8}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" textAlign="center" w="full">
          Giải Quyết Khiếu Nại
        </Heading>
        <Divider />
        <Text fontSize="lg" color="gray.600">
          Chúng tôi cam kết xử lý khiếu nại một cách công bằng, minh bạch và nhanh chóng để đảm bảo quyền lợi của người dùng.
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            1. Phạm Vi Khiếu Nại
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Tin đăng:</strong> Khiếu nại về nội dung tin đăng không chính xác, sai lệch, hoặc vi phạm quy định.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Giao dịch:</strong> Các vấn đề liên quan đến giao dịch giữa người mua và người bán qua nền tảng.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Dịch vụ:</strong> Khiếu nại về chất lượng dịch vụ, lỗi hệ thống, hoặc hỗ trợ không thỏa đáng.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            2. Quy Trình Nộp Khiếu Nại
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Kênh tiếp nhận:</strong> Gửi khiếu nại qua email <strong>support@example.com</strong> hoặc hotline <strong>0123 456 789</strong>.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Thông tin cần cung cấp:</strong> Mô tả chi tiết vấn đề, kèm theo mã tin đăng (nếu có), và bằng chứng như hình ảnh, email, hoặc tin nhắn.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Thời gian nộp:</strong> Khiếu nại cần được gửi trong vòng 7 ngày kể từ khi phát sinh vấn đề.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            3. Quy Trình Xử Lý
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Tiếp nhận:</strong> Xác nhận khiếu nại trong vòng 24 giờ kể từ khi nhận được.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Xử lý:</strong> Kiểm tra và giải quyết khiếu nại trong vòng 3-5 ngày làm việc, tùy thuộc vào mức độ phức tạp.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Phản hồi:</strong> Thông báo kết quả xử lý qua email hoặc điện thoại. Nếu cần, sẽ yêu cầu bổ sung thông tin.
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
                <strong>Thương lượng:</strong> Chúng tôi khuyến khích các bên liên quan tự thương lượng trước khi đưa ra khiếu nại chính thức.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Pháp lý:</strong> Nếu không đạt được thỏa thuận, tranh chấp sẽ được giải quyết theo pháp luật Việt Nam tại tòa án có thẩm quyền.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Text fontSize="md" color="gray.600">
            Để được hỗ trợ nhanh chóng, vui lòng liên hệ qua email <strong>support@example.com</strong> hoặc hotline <strong>0123 456 789</strong>.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default ComplaintResolution;