// File: PropertyDetailPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Stack,
  SimpleGrid,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Flex,
  Spinner,
  useToast,
  Badge,
  Card,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

// Dữ liệu mẫu (thay thế cho API call)
const mockProperty = {
  id: 1,
  title: 'Căn hộ cao cấp Quận 7',
  price: 2500000000,
  location: 'Quận 7, TP.HCM',
  type: 'Apartment',
  description:
    'Căn hộ hiện đại với thiết kế mở, view sông tuyệt đẹp, đầy đủ tiện nghi. Khu vực an ninh, gần trung tâm thương mại và trường học quốc tế.',
  area: 85,
  bedrooms: 2,
  bathrooms: 2,
  images: [
    'https://via.placeholder.com/800x600?text=Main+Image',
    'https://via.placeholder.com/400x300?text=Bedroom',
    'https://via.placeholder.com/400x300?text=Living+Room',
  ],
  amenities: ['Hồ bơi', 'Phòng gym', 'Công viên', 'Bãi đỗ xe'],
  contact: {
    name: 'Nguyễn Văn A',
    phone: '0123 456 789',
    email: 'agent@example.com',
  },
};

const PropertyDetailPage = () => {
  // Lấy ID từ URL
  // TODO: Thêm hook để lấy ID từ URL params bằng react-router-dom
  const { id } = useParams();

  // State hooks
  // TODO: Khởi tạo state cho dữ liệu bất động sản (property) với giá trị ban đầu là null
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const toast = useToast();

  // Effect hook để fetch dữ liệu
  useEffect(() => {
    const fetchProperty = async () => {
      
      setIsLoading(true);                    // TODO: Đặt trạng thái isLoading thành true để hiển thị loading

      try {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProperty(mockProperty);            // TODO: Cập nhật state property với dữ liệu mockProperty
      } catch (error) {
        toast({
            title: 'Loi',
            desciption: 'Khong the tai thong tin BDS',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });                    // TODO: Hiển thị toast thông báo lỗi với tiêu đề "Lỗi" và mô tả "Không thể tải thông tin bất động sản"
      } finally {
        setIsLoading(false);        // TODO: Đặt trạng thái isLoading thành false khi hoàn tất
      }
    };

    fetchProperty();
  }, [id]);

  // Xử lý thay đổi form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  // Xử lý gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Thành công',
      description: 'Yêu cầu của bạn đã được gửi!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setFormData({ name: '', email: '', message: '' });
    // TODO: Reset formData về trạng thái ban đầu (name, email, message rỗng)
  };

  if (isLoading) {
    return (
      <Flex justify="center" py={10}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!property) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Không tìm thấy bất động sản</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>{property.title}</Heading>

      {/* Image Gallery */}
      <Box mb={8}>
        <Image
          src={property.images[0]}
          alt={property.title}
          borderRadius="md"
          w="100%"
          h={{ base: '300px', md: '500px' }}
          objectFit="cover"
          mb={4}
        />
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
          {property.images.slice(1).map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              borderRadius="md"
              h="150px"
              objectFit="cover"
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* Property Info */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box>
          <Stack spacing={4}>
            <Text fontSize="2xl" color="blue.600" fontWeight="bold">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(property.price)}
            </Text>
            <Text fontSize="lg" color="gray.600">
              {property.location}
            </Text>
            <Flex gap={4}>
              <Badge colorScheme="blue">{property.type}</Badge>
              <Badge colorScheme="green">{property.area} m²</Badge>
              <Badge>{property.bedrooms} PN</Badge>
              <Badge>{property.bathrooms} WC</Badge>
            </Flex>
            <Text>{property.description}</Text>
            <Box>
              <Text fontWeight="bold">Tiện ích:</Text>
              <Flex wrap="wrap" gap={2}>
                {property.amenities.map((amenity, index) => (
                  <Badge key={index} colorScheme="teal">
                    {amenity}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Stack>
        </Box>

        {/* Contact Form */}
        <Box>
          <Card p={6} shadow="md">
            <Heading size="md" mb={4}>
              Liên hệ tư vấn
            </Heading>
            <Stack spacing={4} as="form" onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Họ tên</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}                          // TODO: Thêm onChange để gọi handleFormChange
                  placeholder="Nhập họ tên"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}                              // TODO: Thêm onChange để gọi handleFormChange
                  placeholder="Nhập email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tin nhắn</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}                          // TODO: Thêm onChange để gọi handleFormChange
                  placeholder="Nhập yêu cầu của bạn"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Gửi yêu cầu
              </Button>
            </Stack>
            <Box mt={6}>
              <Text fontWeight="bold">Thông tin liên hệ:</Text>
              <Text>Tên: {property.contact.name}</Text>
              <Text>Điện thoại: {property.contact.phone}</Text>
              <Text>Email: {property.contact.email}</Text>
            </Box>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default PropertyDetailPage;