import { Flex, VStack, Text, Input, Button, Icon } from '@chakra-ui/react';

const NewsletterSignup = () => {
    return (
      <VStack align="start" gap={2}>
        <Text fontWeight="bold">Đăng ký nhận tin</Text>
        <Flex>
          <Input placeholder="Nhập email của bạn" size="sm" mr={2} />
          <Button colorScheme="red" size="sm">
            <Icon viewBox="0 0 24 24" boxSize={4}>
              <path fill="white" d="M2 12L9 5v4h13v6H9v4z" />
            </Icon>
          </Button>
        </Flex>
      </VStack>
    );
  };

export default NewsletterSignup;