import React from 'react';
import { Box, Heading, Text, List, ListItem, Divider, VStack, Container } from '@chakra-ui/react';

const PostingRules: React.FC = () => {
  return (
    <Container maxW="1200px" minH="100vh" py={8}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" textAlign="center" w="full">
          Quy Định Đăng Tin
        </Heading>
        <Divider />
        <Text fontSize="lg" color="gray.600">
          Để đảm bảo chất lượng nội dung và trải nghiệm người dùng, chúng tôi đưa ra các quy định sau khi đăng tin trên nền tảng:
        </Text>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            1. Nội Dung Tin Đăng
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Chính xác và minh bạch:</strong> Tin đăng phải cung cấp thông tin chính xác về dự án, bất động sản, bao gồm diện tích, địa chỉ, giá cả, và hình ảnh thực tế.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Không trùng lặp:</strong> Mỗi dự án chỉ được đăng một tin duy nhất. Tin trùng lặp sẽ bị xóa mà không thông báo.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Hình ảnh:</strong> Tải lên ít nhất 3 hình ảnh chất lượng cao, đúng với dự án. Hình ảnh không được chứa logo, watermark, hoặc thông tin liên hệ.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            2. Ngôn Ngữ và Hình Thức
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Ngôn ngữ chuẩn mực:</strong> Sử dụng tiếng Việt đúng chính tả, không sử dụng từ ngữ thô tục hoặc gây hiểu lầm.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Định dạng rõ ràng:</strong> Tiêu đề ngắn gọn, mô tả chi tiết nhưng không vượt quá 1000 từ. Sử dụng dấu câu hợp lý.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={4}>
            3. Quy Định Pháp Lý
          </Heading>
          <List spacing={3}>
            <ListItem>
              <Text>
                <strong>Hợp pháp:</strong> Tin đăng phải tuân thủ luật pháp Việt Nam, không liên quan đến các hoạt động bất hợp pháp hoặc lừa đảo.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Giấy tờ:</strong> Các dự án cần có giấy tờ pháp lý rõ ràng (sổ đỏ, hợp đồng, giấy phép xây dựng) khi được yêu cầu kiểm tra.
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
                <strong>Cảnh báo:</strong> Tin vi phạm nhẹ sẽ được yêu cầu chỉnh sửa trong 24 giờ.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Xóa tin:</strong> Tin vi phạm nghiêm trọng (lừa đảo, thông tin giả mạo) sẽ bị xóa ngay lập tức.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>Khóa tài khoản:</strong> Người dùng vi phạm nhiều lần có thể bị khóa tài khoản vĩnh viễn.
              </Text>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Text fontSize="md" color="gray.600">
            Nếu bạn có thắc mắc về quy định, vui lòng liên hệ qua email <strong>support@example.com</strong> hoặc hotline <strong>0123 456 789</strong>.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default PostingRules;