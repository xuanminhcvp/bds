import React from 'react';
import { Box, Heading, Text, List, ListItem, Divider, VStack, Container } from '@chakra-ui/react';

const OperatingRegulations: React.FC = () => {
  return (
    <Container maxW="1200px" minH="100vh" py={8}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" textAlign="center" w="full">
          Quy Chế Hoạt Động
        </Heading>
        <Divider />
        <Text fontSize="lg" color="gray.600">
          Quy chế hoạt động của nền tảng nhằm đảm bảo quyền lợi của người dùng và duy trì môi trường giao dịch minh bạch, công bằng.
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            1. Mục Đích và Phạm Vi
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Mục đích:</strong> Tạo môi trường trực tuyến an toàn để kết nối người mua, bán, và thuê bất động sản hoặc dự án.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Phạm vi:</strong> Áp dụng cho tất cả người dùng, bao gồm cá nhân, tổ chức đăng ký tài khoản trên nền tảng.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            2. Quyền và Nghĩa Vụ Người Dùng
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Quyền:</strong> Được đăng tin, tìm kiếm thông tin, và liên hệ với các bên liên quan qua nền tảng.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Nghĩa vụ:</strong> Cung cấp thông tin chính xác, tuân thủ quy định đăng tin, và chịu trách nhiệm về nội dung đăng tải.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Bảo mật:</strong> Không chia sẻ thông tin tài khoản hoặc sử dụng nền tảng cho mục đích bất hợp pháp.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            3. Trách Nhiệm của Nền Tảng
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Kiểm duyệt:</strong> Kiểm tra và phê duyệt tin đăng để đảm bảo tính hợp lệ và chính xác.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Hỗ trợ:</strong> Cung cấp kênh liên hệ (email, hotline) để giải quyết thắc mắc hoặc khiếu nại trong vòng 48 giờ.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Bảo vệ dữ liệu:</strong> Cam kết bảo mật thông tin người dùng theo quy định pháp luật.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            4. Xử Lý Vi Phạm
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Cảnh báo:</strong> Người dùng vi phạm quy chế sẽ nhận thông báo và yêu cầu khắc phục trong 24 giờ.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Hạn chế:</strong> Tài khoản vi phạm nghiêm trọng có thể bị tạm khóa hoặc mất quyền truy cập một số tính năng.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Chấm dứt:</strong> Các hành vi lừa đảo hoặc vi phạm pháp luật sẽ dẫn đến khóa tài khoản vĩnh viễn và chuyển hồ sơ cho cơ quan chức năng.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Text fontSize="md" color="gray.600">
            Để biết thêm chi tiết, vui lòng liên hệ qua email <strong>support@example.com</strong> hoặc hotline <strong>0123 456 789</strong>.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default OperatingRegulations;