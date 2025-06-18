import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from '../pages/public/Header';
import Footer from '../pages/public/Footer';

const PublicLayout: React.FC = () => {
  return (
    <Box
      className="public-layout"
      display={'flex'}
      flexDirection="column"
      minHeight="100vh"
    >
      <Header />
      <Box
        as="main"
        className="main-content"
        flex="1"
        px={{ base: 4, md: 8 }}
        py={4}
        pt="60px"
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default PublicLayout;
