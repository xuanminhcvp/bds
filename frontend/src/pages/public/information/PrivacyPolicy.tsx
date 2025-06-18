import React from 'react';
import { Box, Heading, Text, List, ListItem, Divider, VStack, Container } from '@chakra-ui/react';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxW="1200px" minH="100vh" py={8}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" textAlign="center" w="full">
          Chính Sách Bảo Mật
        </Heading>
        <Divider />
        <Text fontSize="lg" color="gray.600">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            1. Thu Thập Thông Tin
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Thông tin cá nhân:</strong> Bao gồm tên, email, số điện thoại, và các thông tin khác bạn cung cấp khi đăng ký hoặc đăng tin.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Dữ liệu tự động:</strong> Bao gồm địa chỉ IP, loại trình duyệt, và hành vi sử dụng trên nền tảng thông qua cookies.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            2. Sử Dụng Thông Tin
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Cung cấp dịch vụ:</strong> Sử dụng thông tin để quản lý tài khoản, xử lý tin đăng, và hỗ trợ người dùng.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Cải thiện trải nghiệm:</strong> Phân tích dữ liệu để tối ưu hóa chức năng và cá nhân hóa nội dung.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Liên hệ:</strong> Gửi thông báo, cập nhật, hoặc thông tin quảng cáo nếu bạn đồng ý.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            3. Chia Sẻ Thông Tin
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Bên thứ ba:</strong> Chỉ chia sẻ thông tin với các đối tác cung cấp dịch vụ (như thanh toán, lưu trữ) và tuân thủ chính sách bảo mật.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Yêu cầu pháp lý:</strong> Có thể cung cấp thông tin nếu được yêu cầu bởi cơ quan pháp luật.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            4. Bảo Vệ và Lưu Trữ Dữ Liệu
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Bảo mật:</strong> Sử dụng các biện pháp kỹ thuật như mã hóa và tường lửa để bảo vệ dữ liệu.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Lưu trữ:</strong> Dữ liệu được lưu trữ trong thời gian cần thiết hoặc cho đến khi bạn yêu cầu xóa.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Quyền người dùng:</strong> Bạn có thể yêu cầu truy cập, chỉnh sửa, hoặc xóa thông tin cá nhân bất kỳ lúc nào.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Text fontSize="md" color="gray.600">
            Nếu có thắc mắc về chính sách bảo mật, vui lòng liên hệ qua email <strong>support@example.com</strong> hoặc hotline <strong>0123 456 789</strong>.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default PrivacyPolicy;