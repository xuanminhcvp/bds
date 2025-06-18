import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useRealEstateStore from '../../stores';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, userproperty, userproject, fetchWallet, fetchPropertyByUser, getProjectByUser, fetchUserProfile } = useRealEstateStore();
  const [propertyStats, setPropertyStats] = useState({ active: 0, expired: 0, pending: 0 });
  const [projectStats, setProjectStats] = useState({ ongoing: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchUserProfile();
    fetchWallet();
    fetchPropertyByUser();
    getProjectByUser();
  }, [fetchUserProfile, fetchWallet, fetchPropertyByUser, getProjectByUser]);

  useEffect(() => {
    if (userproperty.length > 0) {
      const active = userproperty.filter(property => property.status === 'active' && new Date(property.expires_at) > new Date()).length;
      const expired = userproperty.filter(property => new Date(property.expires_at) <= new Date()).length;
      const pending = userproperty.filter(property => property.status === 'pending').length;
      setPropertyStats({ active, expired, pending });
    }
    if (userproject.length > 0) {
      const ongoing = userproject.filter(project => project.status === 'ongoing').length;
      const completed = userproject.filter(project => project.status === 'completed').length;
      const pending = userproject.filter(project => !project.is_approved).length;
      setProjectStats({ ongoing, completed, pending });
    }
  }, [userproperty, userproject]);

  const propertyData = {
    labels: ['Đang hoạt động', 'Hết hạn', 'Chờ phê duyệt'],
    datasets: [{
      data: [propertyStats.active, propertyStats.expired, propertyStats.pending],
      backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
      borderWidth: 1,
    }],
  };

  const projectData = {
    labels: ['Đang thực hiện', 'Hoàn thành', 'Chờ phê duyệt'],
    datasets: [{
      data: [projectStats.ongoing, projectStats.completed, projectStats.pending],
      backgroundColor: ['#2196F3', '#9C27B0', '#FF9800'],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const} },
  };

  return (
    <Box p={4} maxW="1200px" mx="auto" bg="gray.50" borderRadius="md" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Flex align="center" justify="space-between" p={4} bg="white" borderRadius="md">
          <Flex align="center" gap={4}>
            <Avatar name={user?.name || 'User'} src={user?.avatar || undefined} size="md" />
            <Box>
              <Text fontSize="sm" color="gray.600">Xin chào,</Text>
              <Text fontSize="lg" fontWeight="bold">{user?.name || ''}</Text>
            </Box>
          </Flex>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>Thống kê Bất động sản</Heading>
            <Stat>
              <StatLabel>Đang hoạt động</StatLabel>
              <StatNumber>{propertyStats.active}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Hết hạn</StatLabel>
              <StatNumber>{propertyStats.expired}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Chờ phê duyệt</StatLabel>
              <StatNumber>{propertyStats.pending}</StatNumber>
            </Stat>
            <Button mt={4} colorScheme="teal" size="sm" onClick={() => navigate('/userproperty')}>
              Xem chi tiết
            </Button>
            <Box h="150px" mt={4}>
              <Doughnut data={propertyData} options={options} />
            </Box>
          </Box>

          <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>Thống kê Dự án</Heading>
            <Stat>
              <StatLabel>Đang thực hiện</StatLabel>
              <StatNumber>{projectStats.ongoing}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Hoàn thành</StatLabel>
              <StatNumber>{projectStats.completed}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Chờ phê duyệt</StatLabel>
              <StatNumber>{projectStats.pending}</StatNumber>
            </Stat>
            <Button mt={4} colorScheme="teal" size="sm" onClick={() => navigate('/userproject')}>
              Xem chi tiết
            </Button>
            <Box h="150px" mt={4}>
              <Doughnut data={projectData} options={options} />
            </Box>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default DashboardPage;