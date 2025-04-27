import { Badge, Box, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";

const PropertyCard2 = () => {
    return (
        <Box maxW={"sm"} borderWidth={"1px"}>
            <Image src="https://plus.unsplash.com/premium_photo-1744805464532-998bee603eae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Box p={"4"} spaceY={"2"}> 
                <HStack>
                    <Badge colorPalette={"teal"}>
                        Superhost
                    </Badge>
                    <Icon color={"orange.400"}>
                        <HiStar />
                    </Icon>
                    <Text>
                        4.5(36)
                    </Text>
                </HStack>
                <Text fontWeight={"medium"} color={"fg"}>
                    THis is the title of property.
                </Text>
                <HStack>
                    6 . 6 Beds
                </HStack>
            </Box>
        </Box>
    )
};

export default PropertyCard2;