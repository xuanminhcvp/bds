import { useState } from "react";
import { Box, Text, Flex, Button, Link, useBreakpointValue } from "@chakra-ui/react";
import { MdClose, MdOutlineMenu } from "react-icons/md";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const display = useBreakpointValue({ base: "none", md: "flex"});
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Box bg="teal.500" p={4} boxShadow="md">
            <Flex justify={"space-between"} align={"center"} maxW={"1200px"} mx={"auto"}>
                {/* Logo or title */}
                <Text fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                    BDS.com
                </Text>

                {/* Menu di dong */}
                <Box display={{base: "block", md: "none"}}>
                    <Button color={"white"} onClick={toggleMenu}>
                        {isMenuOpen ? <MdClose /> : <MdOutlineMenu />}
                    </Button>
                </Box>

                {/* Menu cho man hinh lon */}
                <Flex
                    display={display}
                    align={"center"}
                    gap={4}
                >
                    <Link href="/" color={"white"} _hover={{ textDecoration: "underline" }}>
                        Trang chu
                    </Link>
                    <Link href="/properties" color={"white"} _hover={{ textDecoration: "underline" }}>
                        DS BDS
                    </Link>
                    <Link href="/about" color={"white"} _hover={{ textDecoration: "underline" }}>
                        Gioi thieu
                    </Link>
                    <Button colorScheme={"teal"} variant={"solid"}>
                        Dang Nhap
                    </Button>
                </Flex>
            </Flex>
            
            {isMenuOpen && (
                <Box display={{ base: "block", md: "none" }} mt={4} bg="teal.600" p={4} borderRadius="md">
                <Link href="/" color="white" display="block" py={2} _hover={{ textDecoration: "underline" }}>
                    Trang Chủ
                </Link>
                <Link href="/properties" color="white" display="block" py={2} _hover={{ textDecoration: "underline" }}>
                    Danh Sách Bất Động Sản
                </Link>
                <Link href="/about" color="white" display="block" py={2} _hover={{ textDecoration: "underline" }}>
                    Giới Thiệu
                </Link>
                </Box>
            )}
        </Box>
    );
};

export default Header;

