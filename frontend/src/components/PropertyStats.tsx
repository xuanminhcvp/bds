import { VStack, Text, HStack, Circle } from "@chakra-ui/react";

interface Article {
    id: number;
    title: string;
} 

interface FeaturedArticlesProps {
    featuredArticles: Article[];
}

function FeaturedArticles({ featuredArticles }: FeaturedArticlesProps) {
  return (
    <VStack align="start" gap={4} p={4} bg="gray.50" borderRadius="md" w="220px">
      <Text fontWeight="bold" fontSize="lg">
        Bài viết được quan tâm
      </Text>
      {featuredArticles.map((article) => (
        <HStack key={article.id} gap={3} align="start">
          <Circle size="24px" bg="pink.100" color="pink.500" fontSize="sm" fontWeight="bold">
            {article.id}
          </Circle>
          <Text fontSize="sm" color="gray.700">
            {article.title}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}

export default FeaturedArticles;