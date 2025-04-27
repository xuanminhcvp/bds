import { Box, Text, Heading, SimpleGrid, HStack, Image, Spacer, Flex } from "@chakra-ui/react";

const TinTuc = () => {
    return (
        <Box p={"10"}>
            <Flex justify="space-between">
                <Heading>Tin tuc bat dong san</Heading>
                
                <Heading>Tin tuc bat dong san</Heading>
            </Flex>
            <SimpleGrid templateColumns={"1fr 1fr 1fr"} gap={"8"} marginTop={"6"}>
                <Box>
                    <Image borderRadius={"xl"} src="https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/07/lai-suat-pvcombank-thumb-1-1-scaled.jpg"/>
                    <HStack marginTop={"4"}>
                        <Text fontSize={"2xl"} margin={"2"}>02</Text>
                        <Text>Lãi Suất Vay Mua Nhà Ngân Hàng PVcomBank Tháng 04/2025</Text>
                    </HStack>
                </Box>
                <Box>
                <Image borderRadius={"xl"} src="https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/07/lai-suat-pvcombank-thumb-1-1-scaled.jpg"/>
                    <HStack marginTop={"4"}>
                        <Text fontSize={"2xl"} margin={"2"}>02</Text>
                        <Text>Lãi Suất Vay Mua Nhà Ngân Hàng PVcomBank Tháng 04/2025</Text>
                    </HStack>
                </Box>
                <Box>
                <Image borderRadius={"xl"} src="https://img.iproperty.com.my/angel/610x342-crop/wp-content/uploads/sites/7/2024/07/lai-suat-pvcombank-thumb-1-1-scaled.jpg"/>
                    <HStack marginTop={"4"}>
                        <Text fontSize={"2xl"} margin={"2"}>02</Text>
                        <Text>Lãi Suất Vay Mua Nhà Ngân Hàng PVcomBank Tháng 04/2025</Text>
                    </HStack>
                </Box>
            </SimpleGrid>
        </Box>
    )
};

export default TinTuc;