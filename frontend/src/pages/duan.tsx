import { useState, useEffect, useCallback } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Box, VStack, Grid, Container, Text, HStack, ButtonGroup, IconButton } from "@chakra-ui/react";
import DuAnCard from "../components/duan/duancard";
import EvaluationCard from "../components/duan/evaluationcard.tsx";
import NewsSection from "../components/duan/newssection.tsx";
import BreadCrumb from "../components/duan/breadcrumb.tsx";
import SortDropdown from "../components/duan/sortdropdown.tsx";

interface Property {
  id: string;
  title: string;
  area: string;
  address: string;
  description: string;
  company: string;
  images: string[];
  status: string;
  total: string;
}

interface ApiResponse {
  total: number; 
  results: Property[]; 
}

export default function Duan() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const totalPages = Math.ceil(total / limit); // Tính tổng số trang

  const fetchProperties = useCallback(async (page: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/duan/?limit=${limit}&offset=${(page - 1) * limit}`
      ); 
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data: ApiResponse = await response.json();
      setProperties(data.results);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProperties(page); 
  }, [page, fetchProperties]); 

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0 }); // Cuộn lên đầu trang
  };

  // Tạo danh sách các nút phân trang
  const renderPageButtons = () => {
    const buttons = [];
    const siblingCount = 1;
    const startPage = Math.max(1, page - siblingCount);
    const endPage = Math.min(totalPages, page + siblingCount);

    // Thêm các nút trang
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <IconButton
          key={i}
          variant={page === i ? "solid" : "ghost"}
          colorScheme={page === i ? "blue" : "gray"}
          onClick={() => handlePageChange(i)}
          aria-label={`Page ${i}`}
        >
          {i}
        </IconButton>
      );
    }

    return buttons;
  };

  if (loading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4}>Error: {error}</Box>;
  }

  return (
    <Box bg="gray.100" p={4}>
      <Container maxW="940px" p={0}>
        <Grid templateColumns="2fr 1fr" gap={3}>
          <Box>
            <BreadCrumb />
            <HStack justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Text fontSize="xs">
                  Hiện đang có {total} dự án
                </Text>
              </Box>
              <SortDropdown
                onChange={(value) => {
                  console.log("Đang sắp xếp theo:", value);
                  setPage(1);
                  // Add sorting logic or API call here
                }}
              />
            </HStack>
            <VStack gap={3}>
              {properties.map((property) => (
                <DuAnCard
                  key={property.id}
                  title={property.title}
                  area={property.area}
                  address={property.address}
                  description={property.description}
                  company={property.company}
                  images={property.images}
                  status="Đang cập nhật"
                />
              ))}
            </VStack>
            <Box mt={6} display="flex" justifyContent="center" alignItems="center">
              <ButtonGroup variant="ghost" size="sm" gap={1}>
                <IconButton
                  aria-label="Trang trước"
                  icon={<LuChevronLeft />}
                  onClick={() => handlePageChange(page - 1)}
                  isDisabled={page === 1}
                />
                {renderPageButtons()}
                <IconButton
                  aria-label="Trang sau"
                  icon={<LuChevronRight />}
                  onClick={() => handlePageChange(page + 1)}
                  isDisabled={page === totalPages}
                />
              </ButtonGroup>
            </Box>
          </Box>
          <Box>
            <EvaluationCard />
            <NewsSection />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}