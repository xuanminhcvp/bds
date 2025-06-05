import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../pages/header.tsx';
import Footer from '../pages/footer.tsx';

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
        <Box pt="64px">{children}</Box> 
    <Footer />
  </>
);

export default AppLayout;