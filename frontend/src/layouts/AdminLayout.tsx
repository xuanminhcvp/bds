import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import SidebarAdmin from '../components/admindashboard/SideBarAdmin';
import Header from '../pages/public/Header';

const AdminLayout: React.FC = () => {
  return (
    <Box
      className="admin-layout"
      display={'flex'}
      flexDirection="column"
      height="100vh"
      overflow="hidden"
    >
      <Header />
      <Flex className="dashboard-container" flex="1" pt="50px">
        <SidebarAdmin />
        <Box
          as="main"
          className="dashboard-content"
          flex="1"
          px={{ base: 4, md: 8 }}
          py={4}
          overflow="auto"
        >
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminLayout;
