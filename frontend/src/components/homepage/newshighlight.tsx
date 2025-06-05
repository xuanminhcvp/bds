import { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from '@chakra-ui/react';

interface NewsItem {
  title: string;
  image: string;
  time?: string;
}

const newsTinNoiBat: NewsItem[] = [
  {
    title: 'Diễn Biến Trái Chiều Giá Chung Cư Hà Nội',
    time: '9 giờ trước',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Phía Đông TP.HCM Dẫn Đầu Nguồn Cung Căn Hộ Sơ Cấp Trong Quý 1/2025',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/1can-ho-tp.hcm_.jpg',
  },
  {
    title: 'Nhà Phố Trung Tâm Hà Nội Ghi Nhận Giá Và Thanh Khoản Tăng',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/nha-pho-1.jpg',
  },
  {
    title: 'Batdongsan.com.vn Thông Báo Lịch Nghỉ Lễ 30/4',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/thumb-1.png',
  },
  {
    title: 'Các Thị Trường Vệ Tinh Phía Nam Dồi Dào Nguồn Cung Mới',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu-Binh-Duong.jpg',
  },
  {
    title: 'Thị Trường BĐS Long An: Thấy Gì Từ Cuộc Đổ Bộ Của Các Ông Lớn?',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/du-an.jpg',
  },
];

const newsTinTuc: NewsItem[] = [
  {
    title: 'Thị Trường Bất Động Sản Long An: Thấy Gì Từ Cuộc Đổ Bộ Của Các Ông Lớn?',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    time: '7 ngày trước',
  },
  {
    title: 'Phía Đông TP.HCM Dẫn Đầu Nguồn Cung Căn Hộ Sơ Cấp Trong Quý 1/2025',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Nhà Phố Trung Tâm Hà Nội Ghi Nhận Giá Và Thanh Khoản Tăng',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Batdongsan.com.vn Thông Báo Lịch Nghỉ Lễ 30/4 Và Quốc Tế Lao Động...',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Các Thị Trường Vệ Tinh Phía Nam Dồi Dào Nguồn Cung Mới',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
];

const newsBDS_TPHCM: NewsItem[] = [
  {
    title: 'Phía Đông TP.HCM Dẫn Đầu Nguồn Cung Căn Hộ Sơ Cấp Trong Quý 1/2025',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    time: '1 ngày trước',
  },
  {
    title: 'Khu Vực Tây Bắc TP.HCM Đón Lượng Ngồn Cung Mới',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Chung Cư Phía Tây TP.HCM Tăng Sức Hút Giao Lưu Khai Niêm Ngồn Cung',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Cập Nhật Tiến Độ Các Dự Án Nhà Ở Xã Hội TP.HCM 2025',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Tổng Hợp Dự Án Chung Cư TP.HCM Mở Bán Quý 2/2025',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Văn Phòng Cộng Chung Đất Việt Ở Đâu? Đánh Giá Chất Lượng Dịch Vụ',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
];

const newsBDS_HaNoi: NewsItem[] = [
  {
    title: 'Diễn Biến Trái Chiều Giá Chung Cư Hà Nội',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
    time: '9 giờ trước',
  },
  {
    title: 'Nhà Phố Trung Tâm Hà Nội Ghi Nhận Giá Và Thanh Khoản Tăng',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Nhịp Dự Án Chung Cư Hà Nội Mở Bán Quý 2/2025',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Đà Tăng Giá Của Chung Cư Hà Nội Dạng Chấm Lãi Shophouse Hà Nội Dịch Hưu Trên Thị Trường Cho Thuê',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
  {
    title: 'Giá Thuê Chung Cư Hà Nội Tăng Nhẹ Trong Quý 1/2025',
    image: 'https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2025/04/chung-cu.jpg',
  },
];

const NewsHighlight = ({ newsItems }: { newsItems: NewsItem[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
      {/* Left - Featured */}
      <Box flex="1">
        <Image
          src={newsItems[activeIndex].image}
          alt="Tin nổi bật"
          borderRadius="md"
          objectFit="cover"
          maxH="200px"
          w="100%"
        />
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          {newsItems[activeIndex].title}
        </Text>
        {newsItems[activeIndex].time && (
          <HStack gap={1} mt={2} color="gray.500" fontSize="sm">
            <Text>🕒</Text>
            <Text>{newsItems[activeIndex].time}</Text>
          </HStack>
        )}
      </Box>

      {/* Right - List */}
      <VStack flex="1" align="start" gap={4}>
        {newsItems.map((item, index) => (
          <Box
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            cursor="pointer"
            _hover={{ color: 'blue.500' }}
            transition="color 0.2s"
          >
            <Text fontWeight={activeIndex === index ? 'bold' : 'normal'}>
              {item.title}
            </Text>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

const NewsTabs = () => {
  return (
    <Tabs defaultIndex={0}> {/* Sửa từ defaultValue thành defaultIndex */}
      <Flex justify="space-between" align="center" mb={4}>
        <TabList>
          <Tab>Tin nổi bật</Tab>
          <Tab>Tin tức</Tab>
          <Tab>BDS TPHCM</Tab>
          <Tab>BDS Hà Nội</Tab>
        </TabList>
        <Button 
          as="a" 
          href="#" 
          onClick={(e) => e.preventDefault()}
          colorScheme="red" 
          size="sm"
        >
          Xem thêm →
        </Button>
      </Flex>
      
      {/* Thêm TabPanels wrapper */}
      <TabPanels>
        <TabPanel>
          <NewsHighlight newsItems={newsTinNoiBat} />
        </TabPanel>
        <TabPanel>
          <NewsHighlight newsItems={newsTinTuc} />
        </TabPanel>
        <TabPanel>
          <NewsHighlight newsItems={newsBDS_TPHCM} />
        </TabPanel>
        <TabPanel>
          <NewsHighlight newsItems={newsBDS_HaNoi} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default NewsTabs;