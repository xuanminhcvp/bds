"use client";

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
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SidebarFilters from "../components/SidebarFilters.tsx";
import PropertyStats from "../components/nhadatban/propertystats.tsx";
import { Property } from "../types/index.ts";
import PropertyCard from "../components/PropertyCard.tsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function Nhadatban() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ priceRange?: string; areaRange?: string }>({});
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const limit = 10;
  const totalPages = Math.ceil(totalItems / limit);

  const fetchData = useCallback(
    async (page: number) => {
      try {
        const params = {
          price_range: filters.priceRange,
          area_range: filters.areaRange,
          limit: limit,
          offset: (page - 1) * limit,
        };
        const response = await axios.get("http://127.0.0.1:8000/api/v1/properties/", { params });

        setTotalItems(response.data.total || 1);
        setProperties(response.data.results || response.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu", err);
        setError("Không thể tải dữ liệu bất động sản. Vui lòng thử lại sau.");
        setTotalItems(1);
      }
    },
    [filters, limit]
  );

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [filters, fetchData]);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

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
              {error ? (
                <Text color="red.500">{error}</Text>
              ) : properties.length > 0 ? (
                properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <Text>Không có bất động sản nào phù hợp.</Text>
              )}
            </Grid>

            {/* Custom Pagination */}
            {renderPagination()}
          </Flex>

          <Flex direction="column" gap={6} flex="1" maxW={{ md: "220px" }}>
            <SidebarFilters filters={filters} onFilterChange={setFilters} />
            <PropertyStats />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
