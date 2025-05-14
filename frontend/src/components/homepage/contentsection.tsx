import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const ContentSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullContent = `Batdongsan.com.vn là nền tảng bất động sản uy tín tại Việt Nam dành cho những người dùng tim kiếm bất động sản để đầu tư hoặc để ở. Chúng tôi cung cấp các dịch vụ như tìm kiếm, cập nhật thông tin về nhà đất, căn hộ, chung cư, biệt thự, nhà phố, shophouse, đất nền, nhà cho thuê, văn phòng, kho xưởng, nhà mặt phố, đất nền cho thuê tại Việt Nam, Sài Gòn, Đà Nẵng... Ổ phân khúc nhà đất bán, các loại nhà nôi bạt gồm bất động sản cho thuê, nhà phố, nhà đến dù ăn và một số loại nhà đẹp nhất đất đai được cập nhật liên tục tại các đất múc cho thuê nhà nguyện cán, thuê phòng trọ giá rẻ, thuê văn phòng, mạt băng kinh doanh...`;

  const shortContent = `${fullContent.split('...')[0]}...`;

  return (
    <Box p={4}>
      <Text fontSize="md" color="gray.800" mb={4}>
        {isExpanded ? fullContent : shortContent}
      </Text>
      <Text
        cursor={"pointer"}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
      </Text>
    </Box>
  );
};

export default ContentSection;