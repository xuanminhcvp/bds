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
  Span, 
  Accordion,
  createListCollection,
} from "@chakra-ui/react";
import { FaBed, FaBath, FaCar, FaChevronDown, FaChevronUp, FaPlus, FaMinus } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

interface Property {
  id: number;
  title: string;
  price: string;
  area: string;
  beds: number;
  baths: number;
  location: string;
  description: string;
  image: string[];
}

interface LocationStat {
  location: string;
  count: number;
}

interface Article {
  id: number;
  title: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
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

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Hợp đồng thuê nhà đất có bắt buộc phải công chứng không?",
    answer:
      "Theo Luật Nhà ở 2014, hợp đồng thuê nhà không bắt buộc phải công chứng, trừ trường hợp thuê nhà ở xã hội hoặc thuê dài hạn trên 5 năm. Tuy nhiên, công chứng giúp đảm bảo tính pháp lý và tránh tranh chấp.",
  },
  {
    id: 2,
    question: "Nguồn nước ngoại có được thuê nhà tại Việt Nam không?",
    answer:
      "Có, người nước ngoài được phép thuê nhà tại Việt Nam nếu có giấy tờ hợp pháp như visa, giấy phép lao động, hoặc thẻ tạm trú. Thời hạn thuê thường không vượt quá thời gian của giấy tờ lưu trú.",
  },
  {
    id: 3,
    question: "Có cần đăng ký tạm trú cho người thuê nhà không?",
    answer:
      "Có, theo Luật Cư trú 2020, người thuê nhà cần đăng ký tạm trú tại địa phương nơi sinh sống. Chủ nhà có trách nhiệm hỗ trợ người thuê làm thủ tục này trong vòng 30 ngày kể từ ngày đến ở.",
  },
  {
    id: 4,
    question: "Chủ nhà có phải đóng thuế khi cho thuê nhà không?",
    answer:
      "Có, chủ nhà phải nộp thuế thu nhập cá nhân và thuế môn bài nếu cho thuê nhà. Thuế thu nhập cá nhân được tính dựa trên doanh thu, với mức giảm trừ tùy theo quy định hiện hành (thường 10% doanh thu).",
  },
  {
    id: 5,
    question: "Khi xây ra tranh chấp về hợp đồng thuê nhà, giải quyết như thế nào?",
    answer:
      "Khi xảy ra tranh chấp, hai bên nên thương lượng hòa giải trước. Nếu không đạt được thỏa thuận, có thể khởi kiện ra tòa án nhân dân có thẩm quyền tại địa phương nơi có bất động sản để giải quyết.",
  },
  {
    id: 6,
    question: "Người thuê nhà có quyền gì khi hợp đồng bị chấm dứt trước thời hạn?",
    answer:
      "Người thuê có quyền yêu cầu bồi thường thiệt hại nếu hợp đồng bị chấm dứt không đúng thỏa thuận. Ngoài ra, họ có thể được hoàn lại tiền thuê đã trả trước hoặc yêu cầu thời gian để tìm chỗ ở mới.",
  },
  {
    id: 7,
    question: "Có thể cho thuê nhà đang thế chấp ngân hàng không?",
    answer:
      "Có, nhưng cần có sự đồng ý của ngân hàng đang thế chấp. Theo Luật Dân sự, việc cho thuê tài sản thế chấp phải được ngân hàng chấp thuận bằng văn bản để tránh vi phạm hợp đồng thế chấp.",
  },
  {
    id: 8,
    question: "Quy định về mức phạt khi vi phạm hợp đồng thuê nhà là gì?",
    answer:
      "Mức phạt vi phạm hợp đồng thuê nhà do hai bên thỏa thuận trong hợp đồng, nhưng không được vượt quá 8% giá trị phần hợp đồng bị vi phạm theo Bộ luật Dân sự 2015. Ngoài ra, có thể áp dụng bồi thường thiệt hại.",
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

function FAQSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFAQs, setOpenFAQs] = useState<string[]>([]); // Trạng thái cho các câu hỏi đang mở
  const initialDisplayCount = 5;

  const displayedFAQs = isExpanded ? faqs : faqs.slice(0, initialDisplayCount);

  return (
    <VStack align="start" gap={2} p={4} bg="gray.50" borderRadius="md" w="500px" marginTop={"10"}>
      <Text fontWeight="bold" fontSize="lg">
        Các câu hỏi thường gặp
      </Text>
      <Accordion.Root
        value={openFAQs}
        onValueChange={(e) => setOpenFAQs(e.value)}
        multiple // Cho phép mở nhiều mục cùng lúc
        collapsible // Cho phép đóng tất cả mục
      >
        {displayedFAQs.map((faq) => (
          <Accordion.Item key={faq.id} value={`faq-${faq.id}`}>
            <Accordion.ItemTrigger>
              <HStack gap={2} align="start">
                <Icon
                  as={openFAQs.includes(`faq-${faq.id}`) ? FaMinus : FaPlus}
                  color="red.500"
                  boxSize={3}
                  mt={1}
                />
                <Span flex="1" fontSize="sm" color="gray.700">
                  {faq.question}
                </Span>
              </HStack>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Text fontSize="sm" color="gray.600" mt={2} pl={5}>
                  {faq.answer}
                </Text>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      {faqs.length > initialDisplayCount && (
        <Link
          color="red.500"
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
  );
}

export default function Nhadatchothue() {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesRes] = await Promise.all([
          axios.get("http://localhost:8000/v1/api/properties"),
        ]);
        setProperties(propertiesRes.data);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu", err);
      } 
    };
    fetchData();
  }, []);

  return (
    <Flex p={6} bg="gray.100" gap={6} direction={{ base: "column", md: "row" }}>
      <SidebarFilters />
      <PropertyStats />
      
      <Box>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} flex="1">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </Grid>
        <FAQSection />
      </Box>
    </Flex>
  );
}
