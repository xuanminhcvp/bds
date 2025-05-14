import { Flex, Link, Image, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const SocialIcons = () => {
    return (
      <Flex align="center" gap={2}>
        <Image
          src="https://staticfile.batdongsan.com.vn/images/newhome/da-dang-ki-bct.svg"
          alt="Đăng ký Bộ Công Thương"
          h="30px"
          marginRight={"12"}
        />
        <Link href="https://facebook.com">
            <IconButton
                aria-label="Facebook"
                variant="ghost"
                color="gray.600"
                size="sm"
            >
                <FaFacebook />
            </IconButton>
        </Link>
        <Link href="https://youtube.com">
            <IconButton
                aria-label="Youtube"
                variant="ghost"
                color="gray.600"
                size="sm"
            >
                <FaYoutube />
            </IconButton>
        </Link>
      </Flex>
    );
  };

export default SocialIcons;