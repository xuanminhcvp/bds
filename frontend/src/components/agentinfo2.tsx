import React from "react";

import {
    Box,
    Heading,
    Button,
    VStack,
    HStack,
    Text,
} from "@chakra-ui/react";

const AgentInfo2: React.FC = () => {

    const sampleAgent = {
        name: "Nguyễn Văn A",
        phone: "0912345678",
        email: "agent@example.com",
        zaloLink: "https://zalo.me/0912345678",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    };

    return (
        <Box
           bg={"gray.200"}
           borderRadius={"2xl"}
           padding={"40px"}
           minH={"25vh"} 
           _hover={{ boxShadow: "xl", transform: "scall(1.01)", transition: "0.3s" }}
        >
            <VStack align={"start"} mb={"30px"} gap={2}>
                <Heading size={"2xl"} color={"gray.700"}>Nguyen Van A</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>agent@example.com</Text>
                <Text fontSize={"lg"} color={"gray.600"}>0912345678</Text>
            </VStack>

            <HStack gap={4}>
                <Button colorScheme={"teal"} _hover={{ bg: "teal.600" }}>
                    Call 
                </Button>
                <Button colorScheme={"messenger"} _hover={{ bg: "blue.600" }}>
                    Send message 
                </Button>
                <Button colorScheme={"purple"} _hover={{ bg: "purple.600" }}>
                    Send email 
                </Button>
            </HStack>
        </Box>
    )
};

export default AgentInfo2;