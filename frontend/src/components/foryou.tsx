import { Box, Text, Heading, SimpleGrid, Image, HStack } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";

const listingData = [
    {
      title: "Ưu đãi sốc căn hộ 1PN-2PN Luxury view Landmark ngắm pháo hoa - free pool, gym, phí QL gần cầu BaSon",
      price: "7,8 triệu/tháng",
      area: "50m2",
      location: "Bình Thạnh, HCM",
      time: "Đăng 3 ngày trước",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    },
    {
      title: "Căn hộ studio ngay trung tâm Quận 1, đầy đủ nội thất, vào ở liền",
      price: "9 triệu/tháng",
      area: "35m2",
      location: "Quận 1, HCM",
      time: "Đăng 1 ngày trước",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
    },
    {
      title: "Cho thuê căn hộ 2PN Vinhomes Central Park, view đẹp, tầng cao",
      price: "12 triệu/tháng",
      area: "70m2",
      location: "Bình Thạnh, HCM",
      time: "Đăng 5 ngày trước",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    },
    {
      title: "Căn hộ mini có ban công riêng, bếp, máy giặt trong phòng",
      price: "6,5 triệu/tháng",
      area: "28m2",
      location: "Phú Nhuận, HCM",
      time: "Đăng hôm qua",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    },
    {
      title: "Chính chủ cho thuê căn hộ cao cấp Sunrise City, full nội thất",
      price: "14 triệu/tháng",
      area: "80m2",
      location: "Quận 7, HCM",
      time: "Đăng 2 ngày trước",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    },
    {
      title: "Phòng trọ cao cấp dạng căn hộ mini, có thang máy, an ninh 24/7",
      price: "5,2 triệu/tháng",
      area: "25m2",
      location: "Tân Bình, HCM",
      time: "Đăng 4 ngày trước",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    },
    {
      title: "Căn hộ mới xây 1PN, thiết kế hiện đại, gần ĐH Công Nghiệp",
      price: "6 triệu/tháng",
      area: "40m2",
      location: "Gò Vấp, HCM",
      time: "Đăng hôm nay",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    },
    {
      title: "Chung cư The Manor 2 phòng ngủ, ban công view sông",
      price: "13 triệu/tháng",
      area: "75m2",
      location: "Bình Thạnh, HCM",
      time: "Đăng 6 ngày trước",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
    }
];
  

const ForYou = () => { 
    return (
        <Box padding={"40px"} rounded="md">
            <SimpleGrid columns={4} gap={"20px"}>
                {listingData.map((item) => (
                <Box height={"370px"} borderRadius={"8px"} shadow="lg">
                    <Image 
                        height={"200px"}
                        src={item.image}
                        roundedTop="md"
                    />
                    <Box padding={"14px"}>
                        <Heading 
                            as={"h2"}                         
                            display="-webkit-box"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            style={{
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                            }}
                            fontSize={"xl"}
                        >
                            {item.title}
                        </Heading>
                        
                        <HStack marginBottom={"2"} marginTop={"2"}>
                            <Text color="red" fontWeight="semibold">{item.price}</Text>
                            <Text color="red" fontWeight="semibold">{item.area}</Text>
                        </HStack>
                        <HStack>
                            <CiLocationOn fontSize={"52px"} />
                            <Text>{item.location}</Text>
                        </HStack>
                        <Box>
                            <HStack>
                                <Text>{item.time}</Text>
                                <Box borderWidth={"1px"} borderColor={"blackAlpha.300"} padding={"4px"} borderRadius={"4px"}>
                                    <MdFavoriteBorder />
                                </Box>
                            </HStack>
                        </Box>
                    </Box>
                </Box>
                ))}
            </SimpleGrid>
        </Box>
    )
};

export default ForYou;