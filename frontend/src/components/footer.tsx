import { Box, Text, Link, Flex, Stack, Heading } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box as="footer" bg={"gray.800"} color={"white"} py={8} mt={"auto"}>
            <Flex 
                maxW={"7xl"}
                mx={"auto"}
                px={{ base: 4, md: 8 }}
                direction={{base: 'column', md: 'row'}}
                justify={"space-between"}
                align={"start"}
                gap={8}
            >
                <Box flex={1}>
                    <Heading size={"md"} mb={2}>
                        Web Bds
                    </Heading>
                    <Text fontSize={"sm"} opacity={0.8}>
                        BDS dep nhat HN 
                    </Text>
                </Box>

                {/* Links */}
                <Stack direction={"column"} gap={2} flex={1}>
                    <Text fontWeight={500}>Lien ket</Text>
                    <Link href="/properties" color="white" fontSize={"sm"} opacity={0.8} _hover={{ textDecoration: "underline" }} >
                        Danh sach
                    </Link>
                    <Link href="/about" color="white" fontSize={"sm"} opacity={0.8} _hover={{ textDecoration: "underline" }} >
                        Ve chung toi
                    </Link>
                    <Link href="/contact" color="white" fontSize={"sm"} opacity={0.8} _hover={{ textDecoration: "underline" }} >
                        Lien he
                    </Link>
                </Stack>
            </Flex>
            
            {/* Copyright */}
            <Text textAlign={"center"} mt={8} fontSize={"sm"} opacity={0.6}>
                © {new Date().getFullYear()} All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;