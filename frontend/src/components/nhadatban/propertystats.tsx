// PropertyStats.tsx
import { useState } from 'react';
import { Box, VStack, Text, Link, Icon, HStack, Circle } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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

const featuredArticles: Article[] = [
  { id: 1, title: "Bình Chánh Tỏa Sáng Trên Bản Đồ Phát Triển Đô Thị" },
  { id: 2, title: "Vì Sao Thị Trường Bất Động Sản Đang Tăng Nhiệt?" },
  { id: 3, title: "Đất Nền Hòa Lạc Nổi Sóng Đầu Năm 2025" },
  { id: 4, title: "Nhà Ở Xã Hội Sẽ Bùng Nổ Năm 2025?" },
  { id: 5, title: "5 Điểm Nóng Sốt Đất Trước Tình Sắp Nhập - Cơ Hội Hay Rủi Ro?" },
];

export default function PropertyStats() {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialDisplayCount = 5;

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