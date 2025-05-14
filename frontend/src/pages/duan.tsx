import { useState, useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import DuAnCard from "../components/duan/duancard";

interface Property {
  id: string;
  title: string;
  area: string;
  address: string;
  description: string;
  company: string;
  images: string[];
  status: string;
}

export default function Duan() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/duan/"); 
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4}>Error: {error}</Box>;
  }

return (
    <Box p={4}>
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
    </Box>
  );
}