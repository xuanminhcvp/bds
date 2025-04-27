import { Box, VStack, HStack, Heading, Grid, GridItem, Text } from "@chakra-ui/react";

const PropertyPerAddress = () => {
    return(
        <Box>
            <Heading as={"h2"}>
                Bất động sản theo địa điểm
            </Heading>
            <Grid column={2}>
                <GridItem colSpan={2}>
                    <Text>123</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>456</Text>
                </GridItem>
            </Grid>     
        </Box>
    )
};

export default PropertyPerAddress;