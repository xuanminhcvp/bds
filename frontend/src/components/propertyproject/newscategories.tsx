import React from 'react';
import { Box, Heading, Text, Button, Grid, GridItem } from '@chakra-ui/react';
import { newsCategories } from "./data.ts"

const RealEstateNews: React.FC = () => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {newsCategories.map((category) => (
          <GridItem key={category.id}>
            <Heading as="h2" size="md" color="gray.700" mb={4}>
              {category.title}
            </Heading>
            {category.items.map((item, index) => (
              <Text key={index} fontSize="sm" color="gray.600" mb={2}>
                {item}
              </Text>
            ))}
            <Button
              color="red.500"
              size="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              Xem thêm
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default RealEstateNews;