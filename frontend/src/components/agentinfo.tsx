import React from "react";
import {
  Box,
  Avatar,
  Text,
  Stack,
  Button,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Phone, Mail, MessageCircle } from "lucide-react"; // Cài: npm install lucide-react

const AgentInfo: React.FC = () => {
  // ✅ Dữ liệu mẫu để test UI
  const sampleAgent = {
    name: "Nguyễn Văn A",
    phone: "0912345678",
    email: "agent@example.com",
    zaloLink: "https://zalo.me/0912345678",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  return (
    <Box
      p={5}
      borderRadius="xl"
      bg="gray.700"
      boxShadow="md"
    >
      <Stack direction="row" gap={4} align="center">

        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {sampleAgent.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {sampleAgent.email}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {sampleAgent.phone}
          </Text>
        </Box>
      </Stack>

      <HStack gap={4} mt={4}>
        <Button
          as="a"
          colorScheme="teal"
          variant="solid"
        >
          Gọi điện
        </Button>

        {sampleAgent.zaloLink && (
          <Button
            as="a"
            colorScheme="blue"
            variant="outline"
          >
            Nhắn Zalo
          </Button>
        )}

        <Button
          as="a"
          colorScheme="gray"
          variant="ghost"
        >
          Gửi email
        </Button>
      </HStack>
    </Box>
  );
};

export default AgentInfo;
