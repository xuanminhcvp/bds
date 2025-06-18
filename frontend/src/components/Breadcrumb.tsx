import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

interface BreadcrumbItemProps {
  label: string;
  path?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItemProps[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <ChakraBreadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      mb={4}
    >
      {items.map((item, index) => (
        <BreadcrumbItem key={index} isCurrentPage={item.isCurrentPage} fontSize={'sm'}>
          {item.path && !item.isCurrentPage ? (
            <BreadcrumbLink
              as={ReactRouterLink}
              to={item.path}
              color="blue.600"
              _hover={{ color: 'blue.800', textDecoration: 'underline' }}
            >
              {item.label}
            </BreadcrumbLink>
          ) : (
            <Text color="gray.600" fontWeight="medium">
              {item.label}
            </Text>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;