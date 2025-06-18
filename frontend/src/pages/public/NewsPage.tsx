import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, SimpleGrid, VStack, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useRealEstateStore from '../../stores';
import Breadcrumb from '../../components/Breadcrumb';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { posts, fetchPostsAPI } = useRealEstateStore();
  const [visibleCount, setVisibleCount] = useState(7);

  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Tin tức', path: '/news', isCurrentPage: true },
  ];

  useEffect(() => {
    fetchPostsAPI();
  }, [fetchPostsAPI]);

  if (!posts.length) return null;

  const featured = posts[0];
  const others = posts.slice(1, visibleCount); 

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Breadcrumb items={breadcrumbItems} />
      <Heading mb={8} color="teal.700" textAlign="center">Tin tức bất động sản</Heading>
      {/* Bài viết nổi bật */}
      <Flex mb={10} gap={6} direction={{ base: 'column', md: 'row' }}>
        <Box flex="1" minW="260px" maxW="400px">
          <Image
            src={featured.image_url?.[0] || ''}
            alt={featured.title}
            rounded="md"
            w="100%"
            h="240px"
            objectFit="cover"
            cursor="pointer"
            onClick={() => navigate(`/post/${featured.slug}`)}
          />
        </Box>
        <VStack align="start" flex="2" spacing={3} justify="center">
          <Heading as="h2" size="lg" color="teal.600" cursor="pointer" onClick={() => navigate(`/post/${featured.slug}`)}>
            {featured.title}
          </Heading>
          <Text
              color="gray.600"
              noOfLines={3}
              dangerouslySetInnerHTML={{ __html: featured.content || '' }}
            />
          <Button colorScheme="teal" size="sm" onClick={() => navigate(`/post/${featured.slug}`)}>
            Đọc tiếp
          </Button>
        </VStack>
      </Flex>
      {/* Danh sách bài viết */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {others.map(post => (
          <Box
            key={post.id}
            bg="white"
            rounded="md"
            shadow="sm"
            p={3}
            _hover={{ shadow: 'md', bg: 'teal.50' }}
            cursor="pointer"
            onClick={() => navigate(`/post/${post.slug}`)}
          >
            <Image
              src={post.image_url?.[0] || ''}
              alt={post.title}
              rounded="md"
              w="100%"
              h="140px"
              objectFit="cover"
              mb={2}
            />
            <Heading as="h3" size="sm" mb={1} noOfLines={2}>{post.title}</Heading>
            <Text
                fontSize="sm"
                color="gray.600"
                noOfLines={2}
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />            
            <Text fontSize="xs" color="gray.500" mt={1}>
              {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      {/* Nút xem thêm */}
      {posts.length > 7 && (
        <Box textAlign="center" mt={8}>
          <Button colorScheme="teal" variant="outline" onClick={() => setVisibleCount(visibleCount + 6)}>
            Xem thêm bài viết
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NewsPage;