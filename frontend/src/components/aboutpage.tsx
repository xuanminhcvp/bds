import { Box, Container, Heading, Text, Stack, SimpleGrid, Image, Icon } from "@chakra-ui/react";

const About = () => {
    return (
        <Box py={12} bg={"gray.400"}>
            <Container maxW={"6xl"} centerContent>
                <Stack direction={"row"}gap={6}>
                    <Box maxW={"50%"}>
                        <Heading as={"h2"} size={"2xl"} mb={4}>
                            Gioi thieu ve cong ty
                        </Heading>
                        <Stack>
                            <Text> là công ty chuyên cung cấp các dịch vụ</Text>
                            <Text> cam kết mang đến những sản phẩm uy tín</Text>
                        </Stack>
                    </Box>
                    <SimpleGrid>
                        <Box>
                            <Heading>
                                Tam nhin
                            </Heading>
                            <Text>
                                Trở thành công ty dẫn đầu
                            </Text>
                        </Box>
                        <Box>
                            <Heading>
                                Su menh
                            </Heading>
                            <Text>
                                Mang lai gia tri dich thuc
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Stack>
                <Box border={"blue"}>
                    <Heading>
                        Giai thuong va chung nhan
                    </Heading>
                    <SimpleGrid>
                        <Box>
                            <Text>Uy tin</Text>
                        </Box>
                        <Box>
                            <Text>Top 10 cty</Text>
                        </Box>
                        <Box>
                            <Text>Giai thuong va dich vu khac</Text>
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid column={{ base: 1, sm: 2, md: 3 }} gap={"4"}>
                        <Image 
                            src="https://picsum.photos/300/400" 
                            alt="Image 1"
                            borderRadius={"lg"}
                            boxShadow={"md"}
                            objectFit={"cover"}
                        />
                        <Image 
                            src="https://picsum.photos/300/400" 
                            alt="Image 1"
                            borderRadius={"lg"}
                            boxShadow={"md"}
                            objectFit={"cover"}
                        />
                        <Image 
                            src="https://picsum.photos/300/400" 
                            alt="Image 1"
                            borderRadius={"lg"}
                            boxShadow={"md"}
                            objectFit={"cover"}
                        />
                    </SimpleGrid>
                </Box>
            </Container>
        </Box>
    )
};

export default About;