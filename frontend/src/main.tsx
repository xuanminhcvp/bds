import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '.';
import ScrollToTop from './components/ScrollToTop';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <Toaster richColors position="bottom-right" />
    </BrowserRouter>
  </ChakraProvider>
);
