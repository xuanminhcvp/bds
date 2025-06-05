import { Box, Flex, Container } from "@chakra-ui/react";
import Sidebar from "../components/dashboard/Sidebar";
import GreetingCard from "../components/dashboard/GreetingCard";
import Wallet from "../components/dashboard/Wallet";
import UserPropertyList from "../components/dashboard/user_property/UserPropertyList";

const Dashboard: React.FC = () => {
  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box
        w={{ base: "80px", md: "250px" }}
        bg="white"
        borderRight="1px"
        borderColor="gray.200"
        position={{ base: "fixed", md: "sticky" }}
        top={0}
        h="100vh"
        zIndex={10}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box flex={1} overflowY="auto">
        <Container maxW="container.xl" py={6}>
          <Flex direction="column" gap={6}>
            <GreetingCard />
            <Wallet />
            <UserPropertyList />
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
};

export default Dashboard;