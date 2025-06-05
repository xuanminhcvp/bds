import ReactDOM from "react-dom/client";
import { Toaster } from 'sonner';
import { 
  ChakraProvider,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from "react-router-dom";
import PropertyList from "../src/components/PropertyList.tsx"; 
import SearchBar from "./components/SearchBar.tsx"; 
import TinTuc from "./components/tintuc.tsx";
import Duan from "./pages/duan.tsx";
import NhaDatBan from "./pages/nhadatban.tsx";
import NationalProjectsSection from "./pages/duan.tsx";
import Nhadatchothue from "./pages/nhadatchothue.tsx";
import HomePage from "./pages/homepage.tsx";
import AreaSelect from "./components/nhadatban/areaselect.tsx";
import PriceRangeSelect from "./components/nhadatban/pricerangeselect.tsx";
import SidebarFilters from "./components/nhadatban/sidebarfilters.tsx";
import PropertyProject from "./pages/propertyproject.tsx";
import WikiBds from "./pages/wikibds.tsx";
import PhanTichDanhGia from "./pages/phantichdanhgia.tsx";
import Nhamoigioi from "./pages/nhamoigioi.tsx";
import Dashboard from "./pages/dashboard.tsx";
import SignUpPage from "./pages/signup.tsx";
import LoginPage from "./pages/login.tsx";
import AppLayout from "./layouts/applayout.tsx"; 
import PostNewPage from "./pages/postnew.tsx"; 
import UserProfile from "./pages/profile.tsx"; 
import AccountManagementPage from "./pages/accountmanagement.tsx"; 
import ProtectedRoute from './components/ProtectedRoute';


const NotFoundPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  return (
    <Flex
      align="center"
      justify="center"
      bg={bgColor}
      px={4}
    >
      <VStack spacing={6} textAlign="center" maxW="md" marginTop={"20"} marginBottom={"20"}>
        <Heading as="h1" size="2xl" color="red.500">
          404
        </Heading>
        <Heading as="h2" size="lg">
          Trang không tồn tại
        </Heading>
        <Text fontSize="lg" color={textColor}>
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu.
        </Text>
        <Button
          as={RouterLink}
          to="/"
          colorScheme="blue"
          size="lg"
          mt={4}
        >
          Quay về trang chủ
        </Button>
      </VStack>
    </Flex>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <AppLayout> 
        <Routes>
          <Route path="/" element={<HomePage />} />  
          <Route path="/search" element={<SearchBar />} />  
          <Route path="/tintuc" element={<TinTuc />} />
          <Route path="/duan" element={<Duan />} />
          <Route path="/nhadatban" element={<NhaDatBan />} />
          <Route path="/nhadatchothue" element={<Nhadatchothue />} />
          <Route path="/nationalprojectsection" element={<NationalProjectsSection />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/areaselect" element={<AreaSelect />} />
          <Route path="/pricerangeselect" element={<PriceRangeSelect />} />
          <Route path="/sidebarfilters" element={<SidebarFilters />} />
          <Route path="/propertyproject" element={<PropertyProject />} />
          <Route path="/wikibds" element={<WikiBds />} />
          <Route path="/phantichdanhgia" element={<PhanTichDanhGia />} />
          <Route path="/nhamoigioi" element={<Nhamoigioi />} />
          <Route path="/dashboard" 
                 element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
          } />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/postnew" 
                 element={
                    <ProtectedRoute>
                        <PostNewPage />
                    </ProtectedRoute>
          } />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/accountmanagement" element={<AccountManagementPage />} />

          <Route path="*" element={<NotFoundPage />} />  
        </Routes>
      </AppLayout>
      <Toaster richColors position="bottom-right" />
    </BrowserRouter>
  </ChakraProvider>
);