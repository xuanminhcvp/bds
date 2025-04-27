import { Box, VStack, HStack, Heading, Input, InputGroup, InputElement } from "@chakra-ui/react";
import { SearchIcon } from "react-icons";

const bgimage = "https://plus.unsplash.com/premium_photo-1668430856694-62c7753fb03b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HeroSession = (
    return (
        <Box bgImage={bgimage}>
            <Heading as={"h1"}>
                Trang web tim kiem bds
            </Heading>
            <Heading as={"h3"}>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain
            </Heading>
            <InputGroup>
                <InputElement>
                    <SearchIcon color="gray.400" />
                </InputElement>
                <Input placeholder="Tim kiem..."/>
            </InputGroup>
        </Box>

    );
);