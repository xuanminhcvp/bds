import React from 'react';
import { Box, Heading, Breadcrumb } from '@chakra-ui/react';

const BreadCrumb: React.FC = () => {
  return (
    <Box>
        <Breadcrumb.Root size="sm">
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Dự án</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                    <Breadcrumb.CurrentLink>Dự án BDS Toàn Quốc</Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
        <Heading as="h3" fontSize="lg">
            Dự án toàn quốc
        </Heading>
    </Box>
    );
};

export default BreadCrumb;