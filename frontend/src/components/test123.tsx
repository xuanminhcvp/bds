import { Box, Image, Text, Flex } from '@chakra-ui/react';

function ImageWithTextBox() {
  return (
    <Flex
      border="1px solid #ccc"
      borderRadius="md"
      p={4}
      w="800px"
      align="center" // Căn giữa theo trục dọc
      gap={4} // Khoảng cách giữa ảnh và phần tử bên cạnh
    >
      <Box boxSize="400px" flexShrink={0}>
        <Image
          src="https://plus.unsplash.com/premium_photo-1672743593121-ddc2fee0e62b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
          alt="Ảnh mẫu"
          objectFit="cover" // Giúp ảnh nằm gọn trong box
          w="100%"
          h="100%"
          borderRadius="md"
        />
      </Box>

      <Text fontSize="md">
        Đây là phần nội dung nằm ngang hàng với ảnh. Bạn có thể thay thế bằng bất kỳ phần tử nào khác.
      </Text>
    </Flex>
  );
}

export default ImageWithTextBox;
