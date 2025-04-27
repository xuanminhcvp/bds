import { Box, Text, Image, Breadcrumb, Flex, Heading, HStack, Badge, Avatar, VStack } from "@chakra-ui/react";

interface Project {
    status: string;
    statusColor: string;
    title: string;
    address: string;
    description: string;
    image: string;
    thumbs: string[];
    owner: string;
    ownerLogo: string;
  }  

const data = [
    {
      status: "Đã bàn giao",
      statusColor: "purple",
      title: "Vincom Plaza Kon Tum",
      address: "2 Đường Phan Đình Phùng, P. Quyết Thắng, TP. Kon Tum",
      description: "Vincom Plaza Kon Tum là trung tâm thương mại hiện đại do Tập đoàn Vingroup đầu tư.",
      image: "https://plus.unsplash.com/premium_photo-1672743593121-ddc2fee0e62b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      thumbs: ["https://images.unsplash.com/photo-1743836623675-7f6c587390ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8", "https://images.unsplash.com/photo-1743976955438-8f4743e06f8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"],
      owner: "Tập đoàn Vingroup",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Đang mở bán",
      statusColor: "green",
      title: "Trung tâm thương mại SAM Plaza",
      address: "118A Hữu Nghị, P. Nam Lý, TP. Đồng Hới, Quảng Bình",
      description: "SAM Plaza nổi bật với mặt bằng cho thuê lớn, đa dạng lựa chọn từ nhà hàng đến showroom.",
      image: "https://images.unsplash.com/photo-1744023018283-b1bbb84dd0df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      thumbs: ["https://plus.unsplash.com/premium_photo-1734543932100-96cf06f153c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8", "https://images.unsplash.com/photo-1743993330456-6fa7a903b3bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"],
      owner: "Công ty CP SAM Holdings",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Đã bàn giao",
      statusColor: "purple",
      title: "TTTM - Dịch vụ Long Hậu",
      address: "Lô DV3, KCN Long Hậu, Cần Giuộc, Long An",
      description: "Trung tâm thương mại 6000m² phục vụ cho nhu cầu mua sắm trong khu công nghiệp.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Công ty CP Long Hậu",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Sắp khai trương",
      statusColor: "orange",
      title: "Aeon Mall Hải Phòng",
      address: "Quận Lê Chân, TP. Hải Phòng",
      description: "Aeon Mall Hải Phòng là tổ hợp mua sắm – giải trí theo chuẩn Nhật Bản.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Aeon Việt Nam",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Đã bàn giao",
      statusColor: "purple",
      title: "Lotte Mart Quận 7",
      address: "469 Nguyễn Hữu Thọ, P. Tân Hưng, Quận 7, TP.HCM",
      description: "Lotte Mart Quận 7 là trung tâm mua sắm kết hợp siêu thị và khu ăn uống.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Lotte Vietnam",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Đang mở bán",
      statusColor: "green",
      title: "The Garden Mall",
      address: "190 Hồng Bàng, P. 12, Quận 5, TP.HCM",
      description: "The Garden Mall là trung tâm thương mại lớn giữa lòng Quận 5, thu hút giới trẻ.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Công ty CP Hùng Hậu",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Đã bàn giao",
      statusColor: "purple",
      title: "TTTM Sense City Cần Thơ",
      address: "36 Hòa Bình, Ninh Kiều, Cần Thơ",
      description: "Sense City Cần Thơ có đầy đủ các thương hiệu bán lẻ và khu vui chơi giải trí.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Saigon Co.op",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Đang mở bán",
      statusColor: "green",
      title: "Mega Mall Vinh",
      address: "Đường Lê Mao kéo dài, TP. Vinh, Nghệ An",
      description: "Mega Mall Vinh là tổ hợp mua sắm – giải trí lớn nhất miền Trung.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Công ty CP Mega Holdings",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Sắp khai trương",
      statusColor: "orange",
      title: "Royal City 2",
      address: "Nguyễn Trãi, Thanh Xuân, Hà Nội",
      description: "Royal City 2 tiếp nối thành công của Royal City với diện tích mở rộng gấp đôi.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Tập đoàn Vingroup",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      status: "Đã bàn giao",
      statusColor: "purple",
      title: "Trung tâm thương mại Estella Place",
      address: "88 Song Hành, P. An Phú, TP. Thủ Đức, TP.HCM",
      description: "Estella Place cung cấp không gian mua sắm đẳng cấp tại khu Đông Sài Gòn.",
      image: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      thumbs: ["https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"],
      owner: "Keppel Land",
      ownerLogo: "https://images.unsplash.com/photo-1744179211676-f0536705fcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
    },
  ];
  

function ProjectCard({ project }: { project: Project }) {
    return (
        <Flex align={"start"} justify={"center"}>
            <Box maxW={"1200px"}>
                <Box maxH={"200px"} rounded="md" borderTopRadius="md">
                    <HStack>
                        <Box boxSize="200px" flexShrink={0}>
                            <Image src="https://images.unsplash.com/photo-1743976955438-8f4743e06f8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" objectFit="cover" w="100%" h="100%" />
                        </Box>
                        <Box>
                            <Badge>{project.status}</Badge>
                            <Heading>{project.title}</Heading>
                            <Text>{project.address}</Text>
                            <Text>{project.description}</Text>
                            <Box>
                                <HStack>
                                    <Avatar.Root>
                                        <Avatar.Image src={project.ownerLogo} />
                                    </Avatar.Root>
                                    <Text>{project.owner}</Text>
                                </HStack>
                            </Box>
                        </Box>
                    </HStack>
                </Box>
            </Box>
        </Flex>
    )
};

function ProductList2() {
    return (
        <Box maxW={"1400px"}>
            <Box>
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="#">Du an</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.CurrentLink>Trung tâm thương mại Toàn Quốc</Breadcrumb.CurrentLink>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </Box>
            <Heading>Dự án trung tâm thương mại toàn quốc</Heading>
            <Flex justify={"space-between"}>
                <Text>Hien dang co 44 du an</Text>
                <Text>Moi nhat</Text>
            </Flex>
            <VStack gap={"6"}>
                {data.map((project, index) => (
                    <ProjectCard key={index} project={project}/>
                ))}
            </VStack>
        </Box>
    );
};


export default ProductList2;