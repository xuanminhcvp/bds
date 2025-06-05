import {
  Flex,
  Box,
  Grid,
  Text,
  Container,
  HStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import SidebarFilters from "../components/SidebarFilters.tsx";
import PropertyStats from "../components/nhadatban/propertystats.tsx";
import { Property } from "../stores/type/PropertyType.ts";
import PropertyCard from "../components/PropertyCard.tsx";
import useRealEstateStore from "../stores"; 

export default function Nhadatban() {
  const { property, isLoadingProperty, errorProperty, fetchProperty, searchFilters } = useRealEstateStore();
  const [page, setPage] = useState<number>(1);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const limit = 10;
  const totalItems = filteredProperties.length;
  const totalPages = Math.ceil(totalItems / limit);

  // Lọc dữ liệu dựa trên bộ lọc từ SearchSlice
  useEffect(() => {
    const applyFilters = () => {
      let result = [...property];
      if (searchFilters.minPrice || searchFilters.maxPrice) {
        result = result.filter(
          (item) =>
            item.price >= (searchFilters.minPrice || 0) &&
            (searchFilters.maxPrice === Infinity || searchFilters.maxPrice === 0
              ? true
              : item.price <= searchFilters.maxPrice)
        );
      }
      if (searchFilters.minArea || searchFilters.maxArea) {
        result = result.filter(
          (item) =>
            item.area >= (searchFilters.minArea || 0) &&
            (searchFilters.maxArea === Infinity || searchFilters.maxArea === 0
              ? true
              : item.area <= searchFilters.maxArea)
        );
      }
      setFilteredProperties(result);
    };
    applyFilters();
  }, [property, searchFilters]);

  // Gọi fetchProperty khi component mount
  useEffect(() => {
    fetchProperty();
    setPage(1);
  }, []);

  // Phân trang
  const paginatedProperties = filteredProperties.slice(
    (page - 1) * limit,
    page * limit
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0 });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <HStack spacing={2} justify="center" mt={6} flexWrap="wrap">
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Trang trước"
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1}
        />
        {pagesToShow.map((p) => (
          <Button
            key={p}
            onClick={() => handlePageChange(p)}
            colorScheme={p === page ? "blue" : "gray"}
            size="sm"
          >
            {p}
          </Button>
        ))}
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Trang sau"
          onClick={() => handlePageChange(page + 1)}
          isDisabled={page === totalPages}
        />
      </HStack>
    );
  };

  return (
    <Box bg="gray.100" minH="100vh">
      <Container maxW="940px" p={0}>
        <Flex p={6} gap={6} direction={{ base: "column", md: "row" }}>
          <Flex direction="column" gap={6} flex="1">
            <Grid templateColumns="1fr" gap={6}>
              {isLoadingProperty ? (
                <Text>Đang tải dữ liệu...</Text>
              ) : errorProperty ? (
                <Text color="red.500">{errorProperty}</Text>
              ) : paginatedProperties.length > 0 ? (
                paginatedProperties.map((property) => (
                  <PropertyCard key={property.property_id} property={property} />
                ))
              ) : (
                <Text>Không có bất động sản nào phù hợp.</Text>
              )}
            </Grid>

            {/* Custom Pagination */}
            {renderPagination()}
          </Flex>
          <Flex direction="column" gap={6} flex="1" maxW={{ md: "220px" }}>
              <SidebarFilters />
              <PropertyStats />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}