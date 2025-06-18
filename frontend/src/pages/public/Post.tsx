import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Link,
  Tag,
  Flex,
  Container,
} from '@chakra-ui/react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { useParams } from 'react-router-dom'; 
import useRealEstateStore from '../../stores';
import AreaSidebar from '../../components/sidebar/AreaSidebar';
import Breadcrumb from '../../components/Breadcrumb';
import ShareSocial from '../../components/ShareSocial';

const PostDisplay: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); 
  const { fetchPostBySlugAPI, post } = useRealEstateStore();

  const currentUrl = window.location.href;
  const shareTitle = post ? post.title : '';

  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Bài viết', path: '/news' },
    { label: post ? post.title : '', isCurrentPage: true },
  ];

  useEffect(() => {
    if (slug) {
      fetchPostBySlugAPI(slug);
    }
  }, [slug, fetchPostBySlugAPI]);

  const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode.type === 'tag' && domNode.name === 'img') {
      const src = domNode.attribs.src;
      return <Image src={src} alt="Post image" mt={4} maxW="100%" />;
    }
    if (domNode.type === 'tag' && domNode.name === 'a') {
      const href = domNode.attribs.href;
      
      const textContent = domNode.children.find(child => child.type === 'text')?.data || 'Link';
      return (
        <Link href={href} isExternal color="blue.500">
          {textContent}
        </Link>
      );
    }
    return undefined;
  },
};

  if (!post) {
    return (
      <Container maxW="4xl" p={4}>
        <Text>Không tìm thấy bài viết.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" p={4}>
      <Flex align="start" gap={8}>  
        <Box flex={3} mr={8}> 
          <Stack spacing={6}>
            <Breadcrumb items={breadcrumbItems} />
            <Heading as="h1" size="xl" color="teal.600">{post.title}</Heading>
            <Text fontSize="lg" color="gray.600">Danh mục: {post.category}</Text>
            <Flex wrap="wrap" gap={2}>
              {post.tags && post.tags.length > 0 ? (
                post.tags.map((tag, index) => (
                  <Tag key={index} colorScheme="teal" fontSize="md">
                    {tag}
                  </Tag>
                ))
              ) : (
                <Text fontSize="md" color="gray.500"></Text>
              )}
            </Flex>
            <Box>{parse(post.content, options)}</Box>
            <Text fontSize="sm" color="gray.500">
              Đăng lúc: {new Date(post.published_at).toLocaleString()}
            </Text>
          </Stack>
        </Box>
        <Box flex={1} minW="250px" display={{ base: 'none', md: 'block' }}>
          <AreaSidebar /> 
        </Box>
      </Flex>
      <Box mt={8}>
        <ShareSocial url={currentUrl} title={shareTitle} />
      </Box>
    </Container>
  );
};

export default PostDisplay;