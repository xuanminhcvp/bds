// File: ProductList.tsx
import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  VStack,
  Heading,
  HStack,
  Image,
  Badge,
  defaultSystem,
} from '@chakra-ui/react';

const ProductList: React.FC = () => {
  // Dữ liệu mẫu trực tiếp
  const products = [
    {
      name: 'Laptop Dell XPS',
      price: 25000000,
      stock: 5,
      image: 'https://picsum.photos/150',
    },
    {
      name: 'iPhone 14 Pro',
      price: 30000000,
      stock: 0,
      image: 'https://picsum.photos/150',
    },
    {
      name: 'Tai nghe Sony',
      price: 5000000,
      stock: 10,
      image: 'https://picsum.photos/150',
    },
  ];

  return (
    <ChakraProvider value={defaultSystem}>
      <Box p={6} bg="gray.600" minH="100vh">
        <Heading mb={8} textAlign="center" color="blue.600">
          Danh sách sản phẩm
        </Heading>
        <VStack gap={6} align="stretch" maxW="800px" mx="auto">
          {products.map((product, index) => (
            <HStack
              key={index}
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              borderWidth="1px"
              gap={4}
              align="center"
            >
              <Image
                src={product.image}
                alt={product.name}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" gap={1} flex={1}>
                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                  {product.name}
                </Text>
                <Text color="gray.600">
                  Giá: {product.price.toLocaleString('vi-VN')} VNĐ
                </Text>
                <HStack>
                  <Text color="gray.500">Tồn kho:</Text>
                  <Badge
                    colorScheme={product.stock > 0 ? 'green' : 'red'}
                    variant="solid"
                  >
                    {product.stock > 0 ? `${product.stock} cái` : 'Hết hàng'}
                  </Badge>
                </HStack>
              </VStack>
              <Button
                colorScheme="blue"
                size="md"
                
              >
                Mua ngay
              </Button>
            </HStack>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default ProductList;