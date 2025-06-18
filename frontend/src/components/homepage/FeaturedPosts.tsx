import React, { useState, useEffect } from 'react';
import { Box, Heading, Image, VStack, Flex, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import useRealEstateStore from '../../stores';  

const FeaturedPosts: React.FC = () => {
    const navigate = useNavigate();
    const { posts, fetchPostsAPI } = useRealEstateStore();
    const displayPosts = posts.slice(0, 5);
    const [hoverIndex, setHoverIndex] = useState(0);

    useEffect(() => {
        fetchPostsAPI();
    }, [fetchPostsAPI]);

    return (
        <Box bg="white" p={6} rounded="md" shadow="md" mb={8} maxW={"container.lg"} mx="auto">
            <Heading size="md" mb={4} color="teal.600">Bài viết nổi bật</Heading>
            <Flex gap={6} direction={{ base: 'column', md: 'row' }}>
                <Box width={"600px"} alignSelf="center">
                <Image
                    src={displayPosts[hoverIndex]?.image_url?.[0] || ''}
                    alt={displayPosts[hoverIndex]?.title}
                    rounded="md"
                    w="100%"
                    h="260px"
                    objectFit="cover"
                    onClick={() => navigate(`/post/${displayPosts[hoverIndex]?.slug}`)}
                    cursor={'pointer'}
                />
                </Box>
                <VStack align="stretch" spacing={4}>
                {displayPosts.map((post, idx) => (
                    <Box
                    key={post.id}
                    p={3}
                    rounded="md"
                    bg={hoverIndex === idx ? 'teal.50' : 'gray.50'}
                    border={hoverIndex === idx ? '1px solid #319795' : '1px solid transparent'}
                    cursor="pointer"
                    onMouseEnter={() => setHoverIndex(idx)}
                    onClick={() => navigate(`/post/${post.slug}`)}
                    >
                        <HStack spacing={3} align="center">
                            <Heading as="h3" size="sm" mb={1} noOfLines={1} color={hoverIndex === idx ? 'teal.600' : 'gray.800'}>
                                {post.title}
                            </Heading>
                            <Box color="gray.600" fontSize="x-small">
                                {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
                            </Box>
                        </HStack>
                    </Box>
                ))}
                </VStack>
            </Flex>
        </Box>
    );
};

export default FeaturedPosts;