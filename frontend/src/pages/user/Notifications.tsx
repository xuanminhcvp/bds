import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Select,
  HStack,
  Divider,
  useColorModeValue,
  Tooltip, 
  IconButton,
  Button
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import useRealEstateStore from '../../stores';


const Notifications: React.FC = () => {
  const { notifications, fetchNotifications, markNotificationAsRead, markAllAsRead } = useRealEstateStore();
  const [filter, setFilter] = useState<string>('all');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.is_read;
    if (filter === 'read') return notif.is_read;
    return true;
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Box p={6} maxW="800px" mx="auto" bg={bgColor} borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb={4}>
        Thông báo
      </Heading>
      <HStack mb={4} justify="space-between" align="center">
        <Select
          w="200px"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="unread">Chưa đọc</option>
          <option value="read">Đã đọc</option>
        </Select>
        <Button
          colorScheme="gray"
          size="sm"
          onClick={() => markAllAsRead()}
          isDisabled={!notifications.some((notif) => !notif.is_read)}   
        >
          Đánh dấu tất cả là đã đọc
        </Button>
      </HStack>
      <VStack divider={<Divider borderColor={borderColor} />} spacing={4} align="stretch" overflowY={"auto"} maxHeight="60vh" mt={6}>
        {filteredNotifications.length === 0 ? (
          <Text>Không có thông báo nào.</Text>
        ) : (
          filteredNotifications.map((notif) => (
            <HStack
              key={notif.notification_id}
              p={4}
              bg={notif.is_read ? 'gray.50' : 'gray.100'}
              borderRadius="md"
              justify="space-between"
              opacity={notif.is_read ? 0.7 : 1}
            >
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{notif.message}</Text>
                <Text fontSize="sm" color="gray.500">
                  {formatDate(notif.created_at)}
                </Text>
              </VStack>
              {!notif.is_read && (
                <Tooltip label="Đánh dấu đã đọc" placement="top">
                  <IconButton
                    size="sm"
                    colorScheme="teal"
                    icon={<FaCheckCircle />}
                    aria-label="Mark as read"
                    onClick={() => markNotificationAsRead(notif.notification_id)}
                  />
                </Tooltip>
              )}
            </HStack>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default Notifications;