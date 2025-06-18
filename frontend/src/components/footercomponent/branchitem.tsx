import { useState } from 'react';
import { Flex, VStack, Text, Collapse, Button } from '@chakra-ui/react';

interface BranchItemProps {
  city: string;
  address: string;
  hotline: string;
}

// Component cho mỗi chi nhánh
const BranchItem = ({ city, address, hotline }: BranchItemProps) => {
  return (
    <VStack
      align="start"
      gap={1}
      flexBasis={{ base: '100%', md: '30%' }}
      px={2}
    >
      <Text fontWeight="bold">{city}</Text>
      <Text fontSize="sm">{address}</Text>
      <Text fontSize="sm">Hotline: {hotline}</Text>
    </VStack>
  );
};

// Component chính cho phần chi nhánh
const BranchesSection = () => {
  const [isOpen, setIsOpen] = useState(true);

  const branches = [
    {
      city: 'Chi nhánh TP. Hồ Chí Minh',
      address:
        'Tầng 3, Tháp B tòa nhà Viettel Complex, 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, TP. Hồ Chí Minh',
      hotline: '1900 1881',
    },
    {
      city: 'Chi nhánh Hải Phòng',
      address:
        'Phòng 502, TD Business Center, lô 20A Lê Hồng Phong, quận Ngô Quyền, TP. Hải Phòng',
      hotline: '1900 1881',
    },
    {
      city: 'Chi nhánh Bình Dương',
      address:
        'Phòng 10, tầng 16, Becamex Tower, số 230 Đại lộ Bình Dương, P. Phú Hòa, TP. Thủ Dầu Một, tỉnh Bình Dương',
      hotline: '1900 1881',
    },
    {
      city: 'Chi nhánh Đà Nẵng',
      address:
        'Tầng 9, tòa nhà Vĩnh Trung Plaza, số 255 – 257 Hùng Vương, phường Vĩnh Trung, quận Thanh Khê, TP. Đà Nẵng',
      hotline: '1900 1881',
    },
    {
      city: 'Chi nhánh Vũng Tàu',
      address:
        'Tầng 4, tòa nhà ACB, số 12 Hoàng Hoa Thám, phường 2, TP. Vũng Tàu, tỉnh Bà Rịa – Vũng Tàu',
      hotline: '1900 1881',
    },
    {
      city: 'Chi nhánh Nha Trang',
      address:
        'Tầng 6, Tòa nhà CTCP Điện Lực Khánh Hòa, 11 Lý Thánh Tôn, Phường Vạn Thạnh, TP Nha Trang, Khánh Hòa',
      hotline: '1900 1881',
    },
  ];

  return (
    <div>
      <Button
        variant="link"
        onClick={() => setIsOpen(!isOpen)}
        fontWeight="bold"
        fontSize="md"
        colorScheme="black"
      >
        --- Xem chi nhánh của Batdongsan.com.vn
      </Button>
      <Collapse in={isOpen}>
        <Flex
          direction="row"
          flexWrap="wrap"
          gap={6}
          justify="space-between"
          py={2}
        >
          {branches.map((branch, index) => (
            <BranchItem
              key={index}
              city={branch.city}
              address={branch.address}
              hotline={branch.hotline}
            />
          ))}
        </Flex>
      </Collapse>
    </div>
  );
};

export default BranchesSection;
