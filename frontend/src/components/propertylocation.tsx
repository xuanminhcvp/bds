import { Box, Text, Heading, SimpleGrid, Button, HStack } from "@chakra-ui/react";

const PropertyLocation = () => {
    return (
        <Box margin={"20px"} >
            <Heading fontSize={"24px"} mx={"auto"}>Bất động sản theo địa điểm</Heading>
            <SimpleGrid templateColumns="1fr 1fr" gap={6} h="600px" marginTop="4" maxW={"1400px"} mx={"auto"}>
                <Box
                  bgImage="url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                  bgSize="cover"
                  
                  p="6"
                  borderRadius="xl"
                  color="white"
                  textShadow="0 0 5px rgba(0,0,0,0.7)"
                >
                  <Text fontSize="xl" fontWeight="bold">TP. HCM</Text>
                  <Text>61.412 tin đăng</Text>
                </Box>
                <Box>
                  <SimpleGrid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={4} h="600px">
                    <Box
                      bgImage="url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                      bgSize="cover"
                      
                      p="6"
                      borderRadius="xl"
                      color="white"
                      textShadow="0 0 5px rgba(0,0,0,0.7)"
                    >
                      <Text fontSize="md" fontWeight="bold">Hà Nội</Text>
                      <Text>60.576 tin đăng</Text>
                    </Box>
                    <Box
                      bgImage="url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                      bgSize="cover"
                      
                      p="6"
                      borderRadius="xl"
                      color="white"
                      textShadow="0 0 5px rgba(0,0,0,0.7)"
                    >
                      <Text fontSize="md" fontWeight="bold">Đà nẵng</Text>
                      <Text>9609 tin đăng</Text>
                    </Box>
                    <Box
                      bgImage="url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                      bgSize="cover"
                      
                      p="6"
                      borderRadius="xl"
                      color="white"
                      textShadow="0 0 5px rgba(0,0,0,0.7)"
                    >
                      <Text fontSize="md" fontWeight="bold">Binh dương</Text>
                      <Text>8038 tin đăng</Text>
                    </Box>
                    <Box
                      bgImage="url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                      bgSize="cover"
                      
                      p="6"
                      borderRadius="xl"
                      color="white"
                      textShadow="0 0 5px rgba(0,0,0,0.7)"
                    >
                      <Text fontSize="md" fontWeight="bold">Đồng nai</Text>
                      <Text>4214 tin đăng</Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              </SimpleGrid>
            <HStack marginTop={"6"}>
                <Button colorPalette={"teal"} variant={"solid"} rounded={"24px"}>Vinhomes Central Park</Button>
                <Button colorPalette={"teal"} variant={"solid"} rounded={"24px"}>Vinhomes Grand Park</Button>
                <Button colorPalette={"teal"} variant={"solid"} rounded={"24px"}>Vinhomes Smart City</Button>
                <Button colorPalette={"teal"} variant={"solid"} rounded={"24px"}>Vinhomes Ocean Park</Button>
                <Button colorPalette={"teal"} variant={"solid"} rounded={"24px"}>Vũng Tàu Pearl</Button>
                <Button colorPalette={"teal"} variant={"solid"} rounded={"24px"}>Bcons Green View</Button>
            </HStack>
        </Box>        
    )
};

export default PropertyLocation;