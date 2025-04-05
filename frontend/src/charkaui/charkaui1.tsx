// File: CardList.tsx
import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  VStack,
  Heading,
  SimpleGrid,
  defaultSystem,
} from '@chakra-ui/react';


const CardList: React.FC = () => {
  // Dữ liệu mẫu trực tiếp
  const cards = [
    { title: 'Card 1', description: 'Mô tả cho card đầu tiên', color: 'teal' },
    { title: 'Card 2', description: 'Mô tả cho card thứ hai', color: 'blue' },
    { title: 'Card 3', description: 'Mô tả cho card thứ ba', color: 'purple' },
  ];

  return (
    <ChakraProvider value={defaultSystem}>
        <Box p={5} bg="gray.500" minH="100vh">
            <Heading mb={6} textAlign="center" color="gray.700">
                  Danh sách Card mẫu
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} gap={6} maxW="1200px" mx="auto">
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="lg"
                        p={5}
                        bg="gray.400"
                        boxShadow="md"
                        _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
                        transition="all 0.2s"
                    >
                        <VStack gap={3} align="stretch">
                            <Heading size="md" color={`${card.color}.500`}>
                            {card.title}
                            </Heading>
                            <Text color="gray.600">{card.description}</Text>
                            <Button
                                colorScheme={card.color}
                                size="sm"
                                w="fit-content"
                                >
                                Xem chi tiết
                            </Button>
                        </VStack>
                    </Box>
                    ))}
            </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};

export default CardList;