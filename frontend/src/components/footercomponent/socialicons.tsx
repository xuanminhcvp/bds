import { Flex, Link, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const SocialIcons = () => {
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const iconColor = useColorModeValue('teal.600', 'teal.300');

  return (
    <Flex align="center" gap={2} justify="center">
      <Link href="https://facebook.com" isExternal>
        <IconButton
          aria-label="Facebook"
          icon={<FaFacebook size={20} />}
          variant="ghost"
          color={iconColor}
          size="lg"
          borderRadius="full"
          _hover={{ bg: hoverBg, transform: 'scale(1.1)' }}
          transition="all 0.2s ease-in-out"
        />
      </Link>
      <Link href="https://youtube.com" isExternal>
        <IconButton
          aria-label="Youtube"
          icon={<FaYoutube size={20} />}
          variant="ghost"
          color={iconColor}
          size="lg"
          borderRadius="full"
          _hover={{ bg: hoverBg, transform: 'scale(1.1)' }}
          transition="all 0.2s ease-in-out"
        />
      </Link>
    </Flex>
  );
};

export default SocialIcons;