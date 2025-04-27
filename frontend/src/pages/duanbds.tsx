"use client";

import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  HStack,
  VStack,
  Menu,
  Portal,
  Badge,
  Link,
} from "@chakra-ui/react";

// Interface cho dữ liệu dự án
interface NationalProject {
  id: number;
  title: string;
  area: string;
  location: string;
  description: string;
  images: string[];
  status: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Thị Trường BĐS Long An: Đột Nền Đang Ở Giai Đoạn Tích Lũy Và Sẵn Sàng Bứt Tốc Vào Chu Kỳ...",
    date: "Hôm qua",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Lãi Suất Vay Mua Nhà Ngân Hàng TPBank Tháng 04/2025",
    date: "Hôm qua",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    title: "La Pura: Dự Án Căn Hộ Mới Tiên Xanh 300m Dài Nhất Đại Lộ Đông Bắc TP.HCM",
    date: "Hôm qua",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

// Dữ liệu mẫu cho các dự án
const nationalProjects: NationalProject[] = [
  {
    id: 1,
    title: "TTC Plaza Đà Nẵng",
    area: "1,46 ha",
    location: "Đường Điện Biên Phủ, Phường Chính Gián, Quận Thanh Khê, Đà Nẵng",
    description:
      "TTC Plaza Đà Nẵng là dự án khu phức hợp do Công ty CP Thường mại Nguyền Kim Đà Nẵng làm chủ đầu tư và Công ty CP Địa ốc Sài Gòn Thương...",
    images: [
      "https://images.unsplash.com/photo-1744719256525-3deab6fd16ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    status: "Đang cập nhật",
  },
  {
    id: 2,
    title: "Eco Retreat Long An",
    area: "20 ha",
    location: "Xã Thạnh Phú, Huyện Bến Lức, Long An",
    description:
      "Eco Retreat Long An là khu nghỉ dưỡng sinh thái cao cấp, mang đến không gian sống xanh và hiện đại, phù hợp cho gia đình và đầu tư...",
    images: [
      "https://images.unsplash.com/photo-1744719256525-3deab6fd16ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    status: "Đang cập nhật",
  },
  {
    id: 3,
    title: "Urban Green Thủ Đức",
    area: "5 ha",
    location: "Thủ Đức, Hồ Chí Minh",
    description:
      "Urban Green Thủ Đức là khu đô thị hiện đại với các tiện ích cao cấp, gần trung tâm thành phố, phù hợp cho cuộc sống năng động...",
    images: [
      "https://images.unsplash.com/photo-1744719256525-3deab6fd16ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    status: "Đang cập nhật",
  },
];

// Component cho mỗi dự án
function ProjectCard({ project }: { project: NationalProject }) {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      gap={6}
    >
      {/* Phần hình ảnh */}
      <Box w="30%">
        <Image
          src={project.images[0]}
          alt={project.title}
          objectFit="cover"
          w="240px"
          h="180px"
        />
        <HStack mt={1} gap={1}>
          {project.images.slice(1).map((image, index) => (
            <Box key={index} position="relative">
              <Image
                src={image}
                alt={`${project.title} - ${index + 1}`}
                objectFit="cover"
                w="120px"
                h="66px"
              />
              {index === project.images.length - 2 && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w="full"
                  h="full"
                  bg="blackAlpha.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white" fontSize="sm" fontWeight="bold">
                    +{project.images.length - 3}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </HStack>
      </Box>

      {/* Phần thông tin */}
      <VStack align="start" flex="1" gap={1} marginTop={"4"}>
        <Badge size="xs" variant="outline" colorScheme="gray" p={"2"}>
          {project.status}
        </Badge>
        <Text fontWeight="bold" fontSize="lg">
          {project.title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {project.area}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {project.location}
        </Text>
        <Text fontSize="sm" color="gray.700">
          {project.description}
        </Text>
      </VStack>
    </Flex>
  );
}

function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Flex gap={4} alignItems="center">
      {/* Hình ảnh */}
      <Image
        src={news.image}
        alt={news.title}
        objectFit="cover"
        w="100px"
        h="80px"
        borderRadius="md"
      />
      {/* Thông tin */}
      <VStack align="start" gap={1}>
        <Text fontSize="sm" fontWeight="bold">
          {news.title}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {news.date}
        </Text>
      </VStack>
    </Flex>
  );
}

function NewsSection() {
  return (
    <Box py={6} px={4} bg="white">
      {/* Tiêu đề và liên kết "Xem tất cả" */}
      <HStack justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Tin tức
        </Text>
        <Link href="#" color="red.500" fontSize="sm">
          Xem tất cả →
        </Link>
      </HStack>

      {/* Danh sách tin tức */}
      <VStack gap={4}>
        {newsItems.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </VStack>
    </Box>
  );
}

// Component chính cho phần "Dự án toàn quốc"
function NationalProjectsSection() {
  return (
    <Box p={"8"} display="flex" flexDirection={"row"}>
      <Box py={6} px={4} bg="white" maxW={"750px"}>
        {/* Tiêu đề và bộ lọc */}
        <Flex justify="space-between" align="center" mb={4} w={"full"}>
          <VStack align="start" gap={1}>
            <Text fontSize="sm" color="gray.500">
              Dự án / Dự án BĐS Toàn Quốc
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              Dự án toàn quốc
            </Text>
            <HStack justify="space-between" w={"full"}>
              <Text fontSize="md" color="gray.600">
                  Hiện đang có 5.660 dự án
              </Text>
              <Menu.Root>
                  <Menu.Trigger asChild>
                      <Button
                          variant="outline"
                          size="sm"
                      >
                          Mới nhất
                      </Button>
                  </Menu.Trigger>
                  <Portal>
                      <Menu.Positioner>
                          <Menu.Content>
                              <Menu.Item value="newest">Mới nhất</Menu.Item>
                              <Menu.Item value="oldest">Cũ nhất</Menu.Item>
                              <Menu.Item value="popular">Phổ biến</Menu.Item>
                          </Menu.Content>
                      </Menu.Positioner>
                  </Portal>
              </Menu.Root>
            </HStack>
          </VStack>
        </Flex>

        {/* Danh sách dự án */}
        <VStack gap={4}>
          {nationalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </VStack>
      </Box>
      <NewsSection />
    </Box>
  );
}

export default NationalProjectsSection;