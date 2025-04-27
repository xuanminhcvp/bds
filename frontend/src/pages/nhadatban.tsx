import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Icon,
  Button,
  HStack,
  VStack,
  Badge,
  Select,
  Portal,
  Circle,
  Link, 
  createListCollection,
} from "@chakra-ui/react";
import { FaBed, FaBath, FaCar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useState } from "react";

interface Property {
  id: number;
  title: string;
  price: string;
  area: string;
  beds: number;
  baths: number;
  parking: number;
  location: string;
  description: string;
  image: string;
  vip: boolean;
}

interface LocationStat {
  location: string;
  count: number;
}

interface Article {
  id: number;
  title: string;
}

const locationStats: LocationStat[] = [
  { location: "Hà Nội", count: 62335 },
  { location: "Hồ Chí Minh", count: 61529 },
  { location: "Đà Nẵng", count: 9830 },
  { location: "Bình Dương", count: 8132 },
  { location: "Khánh Hòa", count: 5245 },
  { location: "Đồng Nai", count: 4474 },
  { location: "Hải Phòng", count: 4171 },
  { location: "Bà Rịa Vũng Tàu", count: 3401 },
  { location: "Long An", count: 3208 },
  { location: "Hưng Yên", count: 3009 },
];

const properties: Property[] = [
  {
    id: 1,
    title: "CHÍNH CHỦ KẸT TIỀN BÁN GẤP ĐI ĐỊNH CƯ 1PN 4TỶ5, 2PN 6TỶ8...",
    price: "6,8 tỷ",
    area: "85 m²",
    beds: 2,
    baths: 2,
    parking: 2,
    location: "Bình Thạnh, Hồ Chí Minh",
    description:
      "Chính chủ gửi bán những căn giá tốt nhất, giá ngộp cần bán nhanh...",
    image:
      "https://images.unsplash.com/photo-1745173036546-c56551790fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vip: true,
  },
  {
    id: 2,
    title: "BÁN NHÀ PHỐ QUẬN 7, SỔ HỒNG RIÊNG, GIÁ TỐT NHẤT KHU VỰC",
    price: "8,5 tỷ",
    area: "100 m²",
    beds: 3,
    baths: 3,
    parking: 1,
    location: "Quận 7, Hồ Chí Minh",
    description:
      "Nhà phố mới xây, thiết kế hiện đại, đầy đủ nội thất, gần trung tâm thương mại.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vip: false,
  },
  {
    id: 3,
    title: "CĂN HỘ CAO CẤP PHÚ NHUẬN, GIÁ RẺ, FULL NỘI THẤT",
    price: "3,2 tỷ",
    area: "60 m²",
    beds: 1,
    baths: 1,
    parking: 0,
    location: "Phú Nhuận, Hồ Chí Minh",
    description:
      "Căn hộ mới bàn giao, view thoáng, gần công viên, tiện ích nội khu đầy đủ.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vip: true,
  },
  {
    id: 4,
    title: "BÁN BIỆT THỰ THỦ ĐỨC, SÂN VƯỜN RỘNG, GIÁ CỰC HỜI",
    price: "15 tỷ",
    area: "200 m²",
    beds: 4,
    baths: 4,
    parking: 3,
    location: "Thủ Đức, Hồ Chí Minh",
    description:
      "Biệt thự sang trọng, sân vườn xanh mát, phù hợp cho gia đình lớn hoặc đầu tư.",
    image:
      "https://plus.unsplash.com/premium_photo-1744992144279-60f58c8e5bad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vip: false,
  },
  {
    id: 5,
    title: "CĂN HỘ 3PN QUẬN 2, VIEW SÔNG, GIÁ NGỘP CẦN BÁN GẤP",
    price: "9,5 tỷ",
    area: "120 m²",
    beds: 3,
    baths: 2,
    parking: 2,
    location: "Quận 2, Hồ Chí Minh",
    description:
      "Căn hộ cao cấp, view sông Sài Gòn, nội thất nhập khẩu, giá tốt nhất thị trường.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vip: true,
  },
];

const priceRanges = createListCollection({
  items: [
    { label: "1 - 2 tỷ", value: "1-2" },
    { label: "2 - 3 tỷ", value: "2-3" },
    { label: "3 - 5 tỷ", value: "3-5" },
    { label: "5 - 7 tỷ", value: "5-7" },
    { label: "7 - 10 tỷ", value: "7-10" },
    { label: "10 - 20 tỷ", value: "10-20" },
  ],
});

const areas = createListCollection({
  items: [
    { label: "Dưới 30 m²", value: "under-30" },
    { label: "30 - 50 m²", value: "30-50" },
    { label: "50 - 80 m²", value: "50-80" },
    { label: "80 - 100 m²", value: "80-100" },
    { label: "Trên 100 m²", value: "over-100" },
  ],
});

const featuredArticles: Article[] = [
  {
    id: 1,
    title: "Bình Chánh Tỏa Sáng Trên Bản Đồ Phát Triển Đô Thị",
  },
  {
    id: 2,
    title: "Vì Sao Thị Trường Bất Động Sản Đang Tăng Nhiệt?",
  },
  {
    id: 3,
    title: "Đất Nền Hòa Lạc Nổi Sóng Đầu Năm 2025",
  },
  {
    id: 4,
    title: "Nhà Ở Xã Hội Sẽ Bùng Nổ Năm 2025?",
  },
  {
    id: 5,
    title: "5 Điểm Nóng Sốt Đất Trước Tình Sắp Nhập - Cơ Hội Hay Rủi Ro?",
  },
];

function SidebarFilters() {
  return (
    <VStack align="start" p={4} bg="gray.50" borderRadius="md" w="250px">
      <Text fontWeight="bold">Lọc theo giá</Text>
      <Select.Root collection={priceRanges}>
        <Select.HiddenSelect />
        <Select.Label>Chọn khoảng giá</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Chọn khoảng giá" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {priceRanges.items.map((priceRange) => (
                <Select.Item item={priceRange} key={priceRange.value}>
                  {priceRange.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>


      <Text fontWeight="bold">Lọc theo diện tích</Text>
      <Select.Root collection={areas} >
        <Select.HiddenSelect />
        <Select.Label>Chọn diện tích</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Chọn diện tích" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {areas.items.map((area) => (
                <Select.Item item={area} key={area.value}>
                  {area.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </VStack>
  );
}

function PropertyCard({ property } : { property: Property }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="sm">
      {property.vip && (
        <Badge colorScheme="red" position="absolute" m={2}>
          VIP KIM CƯƠNG
        </Badge>
      )}
      <Image src={property.image} alt="Property" objectFit="cover" w="100%" h="300px" />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="md">
          {property.title}
        </Text>
        <Text color="red.500" fontWeight="bold" fontSize="lg">
          {property.price}
        </Text>
        <HStack mt={2} color="gray.600" fontSize="sm">
          <Text>{property.area}</Text>
          <Text>·</Text>
          <HStack><Icon as={FaBed} /> <Text>{property.beds}</Text></HStack>
          <Text>·</Text>
          <HStack><Icon as={FaBath} /> <Text>{property.baths}</Text></HStack>
          <Text>·</Text>
          <HStack><Icon as={FaCar} /> <Text>{property.parking}</Text></HStack>
        </HStack>
        <HStack mt={1} color="gray.500">
          <Icon as={MdLocationOn} />
          <Text fontSize="sm">{property.location}</Text>
        </HStack>
        <Text fontSize="sm" mt={2} color="gray.700">
          {property.description}
        </Text>
        <Button
      
          colorScheme="teal"
          mt={4}
          size="sm"
          borderRadius="full"
          w="full"
        >
          0902 542 *** - Hiện số
        </Button>
      </Box>
    </Box>
  );
}

function PropertyStats() {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialDisplayCount = 5; // Số lượng mục hiển thị ban đầu

  // Danh sách hiển thị dựa trên trạng thái mở rộng
  const displayedStats = isExpanded
    ? locationStats
    : locationStats.slice(0, initialDisplayCount);

  return (
    <Box>
      <VStack align="start" gap={2} p={4} bg="gray.50" borderRadius="md" w="250px">
        <Text fontWeight="bold" fontSize="lg">
          Mức bán nhà đất
        </Text>
        {displayedStats.map((stat) => (
          <Text key={stat.location} fontSize="sm" color="gray.700">
            {stat.location} ({stat.count.toLocaleString()})
          </Text>
        ))}
        {locationStats.length > initialDisplayCount && (
          <Link
            color="teal.500"
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={1}
            onClick={() => setIsExpanded(!isExpanded)}
            cursor="pointer"
          >
            {isExpanded ? (
              <>
                Thu gọn <Icon as={FaChevronUp} />
              </>
            ) : (
              <>
                Xem thêm <Icon as={FaChevronDown} />
              </>
            )}
          </Link>
        )}
      </VStack>
      <VStack align="start" gap={4} p={4} bg="gray.50" borderRadius="md" w="250px">
      <Text fontWeight="bold" fontSize="lg">
        Bài viết được quan tâm
      </Text>
      {featuredArticles.map((article) => (
        <HStack key={article.id} gap={3} align="start">
          <Circle size="24px" bg="pink.100" color="pink.500" fontSize="sm" fontWeight="bold">
            {article.id}
          </Circle>
          <Text fontSize="sm" color="gray.700">
            {article.title}
          </Text>
        </HStack>
      ))}
    </VStack>
  </Box>
  );
}



export default function App() {
  return (
    <Flex p={6} bg="gray.100" gap={6} direction={{ base: "column", md: "row" }}>
      <SidebarFilters />
      <PropertyStats />
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} flex="1">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </Grid>
      
    </Flex>
  );
}
