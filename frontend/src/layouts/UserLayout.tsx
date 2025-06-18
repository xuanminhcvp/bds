import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../pages/public/Header';
import useRealEstateStore from '../stores';
import { useNavigate } from 'react-router-dom';

const UserLayout: React.FC = () => {
  const {isAuthenticated} = useRealEstateStore();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
      navigate('/login');
  }
  return (
    <Box
      className="user-layout"
      display={'flex'}
      flexDirection="column"
      height="100vh"
      overflow="hidden"
    >
      <Header />
      <Flex className="dashboard-container" flex="1" pt="50px">
        <Sidebar />
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

export default UserLayout;
