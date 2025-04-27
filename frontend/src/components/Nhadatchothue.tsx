import { Flex, Box, Grid, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import SidebarFilters from "./SidebarFilters";
import PropertyStats from "./PropertyStats";
import FAQSection from "./FAQSection.tsx";
import PropertyCard from "./PropertyCard";
import { Property } from "../types";

export default function Nhadatchothue() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ priceRange?: string; areaRange?: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          price_range: filters.priceRange,
          area_range: filters.areaRange,
        };
        const response = await axios.get("http://localhost:8000/v1/api/properties", { params });
        setProperties(response.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu", err);
        setError("Không thể tải dữ liệu bất động sản. Vui lòng thử lại sau.");
      }
    };
    fetchData();
  }, [filters]);

  return (
    <Flex p={6} bg="gray.100" gap={6} direction={{ base: "column", md: "row" }}>
      <SidebarFilters onFilterChange={setFilters} />
      <PropertyStats />
      <Box flex="1">
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <Text>Không có bất động sản nào phù hợp.</Text>
          )}
        </Grid>
        <FAQSection />
      </Box>
    </Flex>
  );
}

