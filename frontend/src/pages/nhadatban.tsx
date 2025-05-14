"use client";

import {
  Flex,
  Box,
  Grid,
  Text,
  Container,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import {
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SidebarFilters from "../components/SidebarFilters.tsx";
import PropertyStats from "../components/PropertyStats.tsx";
import { Property } from "../types/index.ts";
import { featuredArticles } from "../mocks/data.ts";
import PropertyCard from "../components/PropertyCard.tsx";

// Pagination mới
import { Pagination } from "@chakra-ui/react";

export default function Nhadatban() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ priceRange?: string; areaRange?: string }>({});
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const limit = 10;

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

        const totalItems = response.data.total;
        setTotalItems(totalItems);

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

  return (
    <Box bg="gray.100" minH="100vh">
      <Container maxW="940px" p={0}>
        <Flex p={6} gap={6} direction={{ base: "column", md: "row" }}>
          <Flex direction="column" gap={6}>
            <Grid templateColumns="1fr" gap={6} flex="3">
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

            {/* Pagination mới */}
            <Box mt={6} display="flex" justifyContent="center" alignItems="center">
              <Pagination.Root
                count={totalItems}
                pageSize={10}
                onPageChange={(e) => {
                  setPage(e.page);
                  window.scrollTo({ top: 0 }); 
                }}
                siblingCount={1}
              >
                <ButtonGroup variant="ghost" size="sm" gap={1}>
                  <Pagination.PrevTrigger asChild>
                    <IconButton 
                      asChild
                      aria-label="Trang trước"
                    >
                      <LuChevronLeft />
                    </IconButton>
                  </Pagination.PrevTrigger>

                  <Pagination.Items
                    render={(page) => (
                      <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                        {page.value}
                      </IconButton>
                    )}
                  />

                  <Pagination.NextTrigger asChild>
                    <IconButton 
                      asChild
                    >
                      <LuChevronRight />
                    </IconButton>
                  </Pagination.NextTrigger>
                </ButtonGroup>
              </Pagination.Root>
            </Box>
          </Flex>

          <Flex direction="column" gap={6} flex="1" maxW={{ md: "220px" }}>
            <SidebarFilters filters={filters} onFilterChange={setFilters} />
            <PropertyStats featuredArticles={featuredArticles} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
