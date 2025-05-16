import React from 'react';
import { Box, Heading, Text, Image, HStack, Link } from '@chakra-ui/react';

const EvaluationCard: React.FC = () => {
  return (
    <Box marginBottom={2}>
        <HStack justifyContent="space-between" marginBottom={"2"}>
            <Heading fontSize="md">Đánh giá dự án</Heading>
            <Link fontSize="sm" color="red.500">Xem tất cả →</Link>
        </HStack>
        <Box position="relative" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white">
            <Image 
                src="https://images.unsplash.com/photo-1746990263194-0e2826fed608" 
                alt="Project Image" 
                objectFit="cover" 
                height="220px" 
            />
            <Box 
                position="absolute"  
                left="0" 
                bottom="0" 
                p="6" 
                color="white"
                width="100%"
            >
            <Box>
                <Heading as="h3" size="md">
                Đánh Giá Dự Án HUD Central – Bài Toán Đầu Tư Ven Đô Hiệu Quả?
                </Heading>
                <Text fontSize="sm">2 năm trước</Text>
            </Box>
            </Box>
      </Box>
    </Box>
  );
};

export default EvaluationCard;