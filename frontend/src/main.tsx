// src/main.tsx (hoặc index.tsx nếu bạn dùng tên này)
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem  } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PropertyList from "../src/components/PropertyList.tsx"; 
import Header from "./components/Header.tsx"; 
import Footer from "./components/footer.tsx";
import SearchBar from "./components/SearchBar.tsx"; 
import PaginationProperty from "./components/pagination.tsx"
import { Property } from "./types.ts"
import PropertyDetails from "./components/propertydetails.tsx"
import About from "./components/aboutpage.tsx"
import CardList from "./charkaui/charkaui1.tsx"
import ProductList from "./charkaui/charkaui2.tsx"
import UserList from "./charkaui/charkaui3.tsx"
import TaskDashboard from "./charkaui/charkaui4.tsx"
import RealEstatePost from "./components/realestatepost.tsx"
import AgentInfo from "./components/agentinfo.tsx"
import AgentInfo2 from "./components/agentinfo2.tsx"
import PropertyPerAddress from "./components/propertyperaddress.tsx"
import FAQ from "./components/FAQ.tsx"
import App from "./components/123.jsx"
import PropertyCard2 from "./components/propertycard2.tsx"
import Demo from "./somethingsmall/tabbds.tsx"
import ForYou from "./components/foryou.tsx"
import PropertyLocation from "./components/propertylocation.tsx"
import TinTuc from "./components/tintuc.tsx"
import ProductList2 from "./components/duan.tsx"
import ImageWithTextBox from "./components/test123.tsx"
import NhaDatBan from "./pages/nhadatban.tsx"
import Nhadatchothue from "./pages/nhadatchothue.tsx"
import NationalProjectsSection from "./pages/duanbds.tsx"






const fakeProperty: Property = {
  id: "1",
  title: "Luxury Villa in Beverly Hills",
  description: "A beautiful and spacious villa with a stunning view of the hills. Perfect for family vacations or a peaceful retreat.",
  price: 5000000,
  images: [
      "https://picsum.photos/600/800",
      "https://picsum.photos/300/400",
      "https://picsum.photos/300/400",
      "https://picsum.photos/300/400",
      "https://picsum.photos/300/400",
  ],
  location: "Beverly Hills, CA",
  contactInfo: {
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "johndoe@example.com",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ChakraProvider value={defaultSystem}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PropertyList />} />  
        <Route path="/search" element={<SearchBar />} />  
        <Route path="/pagination" element={<PaginationProperty />} />  
        <Route path="/property/:id" element={<PropertyDetails property={fakeProperty} />} />  
        <Route path="/about" element={<About />} />  
        <Route path="/cards" element={<CardList />} />  
        <Route path="/products" element={<ProductList />} />  
        <Route path="/users" element={<UserList />} />
        <Route path="/realestatepost" element={<RealEstatePost />} />    
        <Route path="/agentinfo" element={<AgentInfo />} />    
        <Route path="/agentinfo2" element={<AgentInfo2 />} />    
        <Route path="/faq" element={<FAQ />} />    
        <Route path="/app" element={<App />} />  
        <Route path="/propertyperaddress" element={<PropertyPerAddress />} />
        <Route path="/demo" element={<Demo />} /> 
        <Route path="/propertycard2" element={<PropertyCard2 />} />
        <Route path="/foryou" element={<ForYou />} />
        <Route path="/propertylocation" element={<PropertyLocation />} />
        <Route path="/tintuc" element={<TinTuc />} />
        <Route path="/duan" element={<ProductList2 />} />
        <Route path="/test123" element={<ImageWithTextBox />} />
        <Route path="/nhadatban" element={<NhaDatBan />} />
        <Route path="/nhadatchothue" element={<Nhadatchothue />} />
        <Route path="/nationalprojectsection" element={<NationalProjectsSection />} />


        



 
  
        <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />  
      </Routes>
      <Footer />
    </BrowserRouter>
    </ChakraProvider>
);

