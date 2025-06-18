import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Duan from './pages/public/ProjectSection.tsx';
import SaleSection from './pages/public/SaleSection.tsx'; 
import Nhadatchothue from './pages/public/RentSection.tsx';
import HomePage from './pages/public/HomePage.tsx';
import Dashboard from './pages/user/Dashboard.tsx';
import SignUpPage from './pages/public/SignUp.tsx';
import LoginPage from './pages/public/Login.tsx';
import PostNewPage from './pages/user/PostNew.tsx';
import UserUpdate from './components/dashboard/UserUpdate.tsx';
import WalletDashboard from './pages/user/WalletDashboard.tsx';
import Notifications from './pages/user/Notifications.tsx';
import UserProperty from './pages/user/UserProperty.tsx';
import ProjectNew from './pages/user/ProjectNew.tsx';
import ChoosePostTypePage from './pages/user/ChoosePostTypePage.tsx';
import UserProject from './pages/user/UserProject.tsx';
import LoginPageAdmin from './pages/admin/LoginAdmin.tsx';
import UsersManagement from './pages/admin/UsersManagement.tsx';
import AdminProperty from './pages/admin/AdminProperty.tsx';
import AdminProject from './pages/admin/AdminProject.tsx';
import CreateNewsPost from './pages/admin/CreatePost.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import PostDisplay from './pages/public/Post.tsx';
import NewsPage from './pages/public/NewsPage.tsx';
import PropertyDetail from './pages/public/PropertyDetail.tsx';
import ProjectDetail from './pages/public/ProjectDetail.tsx';
import PostingRules from './pages/public/information/PostingRules.tsx';
import OperatingRegulations from './pages/public/information/OperatingRegulations.tsx';
import TermsOfAgreement from './pages/public/information/TermsOfAgreement.tsx';
import PrivacyPolicy from './pages/public/information/PrivacyPolicy.tsx';
import ComplaintResolution from './pages/public/information/ComplaintResolution.tsx';
import AboutUs from './pages/public/information/AboutUs.tsx';


const NotFoundPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Flex align="center" justify="center" bg={bgColor} px={4} minH={'100vh'}>
      <VStack
        spacing={6}
        textAlign="center"
        maxW="md"
        marginTop="20"
        marginBottom="20"
      >
        <Heading as="h1" size="2xl" color="red.500">
          404
        </Heading>
        <Heading as="h2" size="lg">
          Trang không tồn tại
        </Heading>
        <Text fontSize="lg" color={textColor}>
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu.
        </Text>
        <Button as={RouterLink} to="/" colorScheme="teal" size="lg" mt={4}>
          Quay về trang chủ
        </Button>
      </VStack>
    </Flex>
  );
};

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/duan" element={<Duan />} />
      <Route path="/nhadatban" element={<SaleSection />} />
      <Route path="/nhadatchothue" element={<Nhadatchothue />} />
      <Route path="/nationalprojectsection" element={<Duan />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<LoginPageAdmin />} />
      <Route path="/post/:slug" element={<PostDisplay />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/posting-rules" element={<PostingRules />} />
      <Route path="/operating-regulations" element={<OperatingRegulations />} />
      <Route path="/terms-of-agreement" element={<TermsOfAgreement />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/complaint-resolution" element={<ComplaintResolution />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Route>

    {/* User routes */}
    <Route element={<UserLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/postnew" element={<PostNewPage />} />
      <Route path="/projectnew" element={<ProjectNew />} />
      <Route path="/userupdate" element={<UserUpdate />} />
      <Route path="/wallet" element={<WalletDashboard />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/userproperty" element={<UserProperty />} />
      <Route path="/chooseposttype" element={<ChoosePostTypePage />} />
      <Route path="/userproject" element={<UserProject />} />
    </Route>

    {/* Admin routes */}
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UsersManagement />} />
      <Route path="/admin/properties" element={<AdminProperty />} />
      <Route path="/admin/projects" element={<AdminProject />} />
      <Route path="/admin/create-post" element={<CreateNewsPost />} />
    </Route>

    {/* Not found */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
