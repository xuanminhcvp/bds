import { Box, Button, Grid, Image, Input, VStack, HStack, Icon, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { Toaster } from 'sonner';

const UserProfile = () => {
  return (
    <>
      <Box as="section" maxW="7xl" mx="auto" p={4}>
        <Grid
          templateColumns={{ base: '1fr', md: '2fr 3fr', lg: '1fr 3fr' }}
          gap={6}
          alignItems="start"
        >
          {/* Profile Info Section */}
          <Box
            bg="white"
            p={5}
            rounded="md"
            shadow="md"
            w="full"
            minH={{ md: '100vh' }}
          >
            <VStack gap={4} align="stretch">
              {/* Profile Image */}
              <Box textAlign="center">
                <Box position="relative" w="100px" h="100px" mx="auto">
                  <Image
                    src="https://via.placeholder.com/100"
                    alt="profile image"
                    rounded="full"
                    border="1px"
                    borderColor="blue.500"
                    objectFit="cover"
                    w="full"
                    h="full"
                  />
                  <Icon
                    as={AiFillEdit}
                    position="absolute"
                    bottom={2}
                    right={0}
                    bg="blue.500"
                    color="white"
                    rounded="full"
                    p={1}
                    boxSize={6}
                  />
                </Box>
                <Text fontSize="xs" color="green.600" mt={2}>
                  File uploaded!!!
                </Text>
              </Box>

              {/* Form */}
              <form>
                <VStack gap={4}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="sm">
                      Username
                    </FormLabel>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Nhập username"
                      bg="gray.100"
                      rounded="md"
                      border="1px"
                      borderColor="gray.300"
                      _focus={{ borderColor: 'blue.500' }}
                      defaultValue="john_doe"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="sm">
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Nhập email"
                      bg="gray.100"
                      rounded="md"
                      border="1px"
                      borderColor="gray.300"
                      _focus={{ borderColor: 'blue.500' }}
                      defaultValue="john.doe@example.com"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="sm">
                      Mật khẩu
                    </FormLabel>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Nhập mật khẩu"
                      bg="gray.100"
                      rounded="md"
                      border="1px"
                      borderColor="gray.300"
                      _focus={{ borderColor: 'blue.500' }}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    width="full"
                    rounded="md"
                    fontWeight="bold"
                  >
                    Save Changes
                  </Button>
                </VStack>
              </form>

              {/* Action Buttons */}
              <HStack
                justify={{ base: 'space-between', md: 'stretch' }}
                flexDir={{ base: 'row', md: 'column', xl: 'row' }}
                mt={2}
                gap={2}
              >
                <Button
                  colorScheme="red"
                  w={{ base: 'auto', md: 'full', xl: 'auto' }}
                  rounded="md"
                  fontWeight="bold"
                  fontSize="sm"
                >
                  Log Out
                </Button>
                <Button
                  colorScheme="red"
                  w={{ base: 'auto', md: 'full', xl: 'auto' }}
                  rounded="md"
                  fontWeight="bold"
                  fontSize="sm"
                >
                  Delete
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Posts Section */}
          <Box p={2} w="full">
            <Grid
              templateColumns={{
                base: '1fr',
                md: '1fr',
                lg: 'repeat(3, 1fr)',
              }}
              gap={6}
              overflowY="auto"
              maxH="100vh"
              px={4}
              pt={5}
              pb={10}
            >
              {/* Create New Post Button */}
              <Box
                bg="white"
                rounded="md"
                shadow="lg"
                _hover={{ shadow: 'xl' }}
                p={10}
                textAlign="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
              >
                <Icon as={BsFillPlusSquareFill} boxSize={10} color="gray.700" mb={3} />
                <Text fontWeight="bold" fontSize="lg">
                  Create New Post
                </Text>
              </Box>

              {/* Sample Post Cards */}
              <Box bg="white" rounded="md" shadow="lg" p={4}>
                <Image
                  src="https://via.placeholder.com/300"
                  alt="post image"
                  rounded="md"
                  mb={3}
                />
                <Text fontWeight="bold">Sample Post Title</Text>
                <Text fontSize="sm" color="gray.600">
                  This is a sample post description.
                </Text>
                <Button colorScheme="red" size="sm" mt={2}>
                  Delete Post
                </Button>
              </Box>
              <Box bg="white" rounded="md" shadow="lg" p={4}>
                <Image
                  src="https://via.placeholder.com/300"
                  alt="post image"
                  rounded="md"
                  mb={3}
                />
                <Text fontWeight="bold">Another Post</Text>
                <Text fontSize="sm" color="gray.600">
                  Another sample post description.
                </Text>
                <Button colorScheme="red" size="sm" mt={2}>
                  Delete Post
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Toaster />
      </Box>
      {/* Footer */}
      <Box as="footer" bg="gray.800" color="white" p={4} mt={8} textAlign="center">
        <Text>© 2025 Your App Name. All rights reserved.</Text>
      </Box>
    </>
  );
};

export default UserProfile;