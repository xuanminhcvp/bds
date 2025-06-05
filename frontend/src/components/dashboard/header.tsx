import { Box, Text, Select, HStack } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="white" p={4} shadow="sm" w="full">
      <HStack justify="space-between">
        <Select w="200px" defaultValue="all">
          <option value="all">All Channels</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">Youtube</option>
        </Select>
        <Text fontWeight="bold">Welcome back, Drennan 👋</Text>
      </HStack>
    </Box>
  );
};

export default Header;