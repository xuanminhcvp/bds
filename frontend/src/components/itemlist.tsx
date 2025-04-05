import {
    Box,
    Grid,
    Heading,
    Spinner,
    Text,
    VStack,
    Card,
    CardBody,
    CardHeader,
    Badge,
    Button,
  } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { ItemsService } from "../../client"
import { Link } from "react-router-dom"

const ItemList = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["items"],
        queryFn: () => ItemsService.getAllItems(),
    })

    if (isLoading) {
        return (
            <Box textAlign="center" mt="10">
                <Spinner size="xl" />
            </Box>
        )
    }

    if (isError || !data) {
        return (
            <Box textAlign="center" mt={10}>
                <Text>da co loi xay ra khi tai danh sach</Text>
            </Box>
        )
    }

    
}