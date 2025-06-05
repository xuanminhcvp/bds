import React from 'react';
import { Box, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const BreadCrumb: React.FC = () => {
  return (
    <Box>
      <Breadcrumb fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Dự án</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Dự án BDS Toàn Quốc</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h3" fontSize="lg">
        Dự án toàn quốc
      </Heading>
    </Box>
  );
};

export default BreadCrumb;