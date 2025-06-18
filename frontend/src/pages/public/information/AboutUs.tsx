import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  SimpleGrid,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

const AboutUs = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} py={16}>
      <Container maxW="container.xl">
        {/* Hero Section */}
        <VStack spacing={6} textAlign="center" mb={12}>
          <Heading as="h1" size="2xl" color="blue.600">
            Về Chúng Tôi
          </Heading>
          <Text fontSize="lg" color={textColor} maxW="2xl">
            Chào mừng đến với Bất Động Sản, đơn vị hàng đầu trong lĩnh vực bất động sản, mang đến những giải pháp tối ưu và giá trị bền vững cho khách hàng.
          </Text>
        </VStack>

        {/* Company Introduction */}
        <HStack spacing={8} align="start" mb={16}>
          <Box flex={1}>
            <Image
              src="http://localhost:8000/assets/property/property_026.jpg"
              alt="Company Image"
              borderRadius="lg"
              boxShadow="lg"
              objectFit="cover"
            />
          </Box>
          <VStack flex={1} spacing={4} align="start">
            <Heading as="h2" size="xl">
              Câu Chuyện Của Chúng Tôi
            </Heading>
            <Text color={textColor}>
              Thành lập từ năm 2025, Bất Động Sản đã không ngừng phát triển để trở thành đối tác tin cậy của hàng nghìn khách hàng. Chúng tôi chuyên cung cấp các dịch vụ bất động sản đa dạng từ mua bán, cho thuê đến tư vấn đầu tư.
            </Text>
            <Text color={textColor}>
              Sứ mệnh của chúng tôi là kiến tạo những không gian sống lý tưởng, kết nối cộng đồng và mang lại giá trị vượt trội cho khách hàng và đối tác.
            </Text>
            <Text color={textColor}>
              Với đội ngũ chuyên gia giàu kinh nghiệm và nhiệt huyết, chúng tôi luôn đặt lợi ích của khách hàng lên hàng đầu, đảm bảo mỗi giao dịch đều minh bạch, an toàn và hiệu quả.
            </Text>
            <Text color={textColor}>
              Bất Động Sản không chỉ là nơi cung cấp dịch vụ, mà còn là cầu nối giúp hiện thực hóa giấc mơ sở hữu ngôi nhà hoàn hảo của bạn. Chúng tôi cam kết đồng hành cùng khách hàng trên mọi hành trình, từ những bước đầu tiên đến khi chìa khóa trao tay.
            </Text>
          </VStack>
        </HStack>

        <Divider my={12} />

        {/* Core Values */}
        <VStack spacing={8} mb={16}>
          <Heading as="h2" size="xl">
            Giá Trị Cốt Lõi
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              {
                title: 'Chất Lượng',
                description: 'Cam kết cung cấp dịch vụ và sản phẩm đạt tiêu chuẩn cao nhất.',
              },
              {
                title: 'Uy Tín',
                description: 'Xây dựng niềm tin với khách hàng qua sự minh bạch và chuyên nghiệp.',
              },
              {
                title: 'Sáng Tạo',
                description: 'Luôn đổi mới để mang đến giải pháp bất động sản độc đáo.',
              },
            ].map((value) => (
              <Box
                key={value.title}
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)' }}
                transition="all 0.3s"
              >
                <Heading as="h3" size="md" mb={2}>
                  {value.title}
                </Heading>
                <Text color={textColor}>{value.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Team Section */}
        <VStack spacing={8}>
          <Heading as="h2" size="xl">
            Đội Ngũ Của Chúng Tôi
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              { name: 'Nguyễn Văn A', role: 'Giám đốc', img: 'http://localhost:8000/assets/property/nv1.jpeg' },
              { name: 'Trần Thị B', role: 'Trưởng phòng Kinh doanh', img: 'http://localhost:8000/assets/property/nv2.jpg' },
              { name: 'Lê Văn C', role: 'Chuyên gia Tư vấn', img: 'http://localhost:8000/assets/property/nv3.jpg'},
            ].map((member) => (
              <VStack
                key={member.name}
                p={4}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                _hover={{ boxShadow: 'lg' }}
                transition="all 0.3s"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  borderRadius="full"
                  boxSize="120px"
                  objectFit="cover"
                />
                <Text fontWeight="bold" fontSize="lg">
                  {member.name}
                </Text>
                <Text color={textColor}>{member.role}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutUs;