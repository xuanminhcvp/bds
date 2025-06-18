import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useRealEstateStore from '../../stores';
import { reject } from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { property, fetchProperty } = useRealEstateStore();
  const [propertyStats, setPropertyStats] = useState({ approved: 0, pending: 0, expired: 0, rejected: 0 });

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  useEffect(() => {
    if (property?.length > 0) {
      const approved = property.filter(
        (item) => item.status === 'approved' && new Date(item.expires_at) > new Date()
      ).length;
      const pending = property.filter(
        (item) => item.status === 'pending'
      ).length;
      const expired = property.filter(
        (item) => item.status === 'approved' && new Date(item.expires_at) <= new Date()
      ).length;
      const rejected = property.filter(
        (item) => item.status === 'rejected'
      ).length;
      setPropertyStats({ approved, pending, expired, rejected });
    }
  }, [property]);

  const propertyData = {
    labels: ['Đang hoạt động', 'Chờ phê duyệt', 'Hết hạn', 'Bị từ chối'],
    datasets: [{
      data: [propertyStats.approved, propertyStats.pending, propertyStats.expired, propertyStats.rejected ],
      backgroundColor: [ '#4CAF50', '#FFC107', '#F44336', '#9E9E9E' ],
      borderWidth: 1,
    }],
  };

  return (
    <Box p={4} maxW="1400px" mx="auto" bg="gray.50" borderRadius="md" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Báo cáo Bất động sản</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>Thống kê Bất động sản</Heading>
            <Stat>
              <StatLabel>Đang hoạt động</StatLabel>
              <StatNumber>{propertyStats.approved}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Chờ phê duyệt</StatLabel>
              <StatNumber>{propertyStats.pending}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Hết hạn</StatLabel>
              <StatNumber>{propertyStats.expired}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bị từ chối</StatLabel>
              <StatNumber>{propertyStats.rejected}</StatNumber>
            </Stat>
          </Box>
          <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
            <Box h="240px" mt={4}>
              <Doughnut data={propertyData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </Box>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default AdminDashboard;