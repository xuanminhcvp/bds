import {
  Flex,
  Box,
  Grid,
  Text,
  Container,
  HStack,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import ProjectCard from '../../components/projectsection/ProjectCard';
import useRealEstateStore from '../../stores/index.ts';
import AreaSidebar from '../../components/sidebar/AreaSidebar.tsx';
import ProjectFilter from '../../components/projectsection/ProjectFilter.tsx';
import FAQSection from '../../components/Faq'


const ProjectSection = () => {
  const { projects, fetchProjects, filterProject, setFilterProject } =
    useRealEstateStore();
  
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const totalItems = projects.length;
  const totalPages = Math.ceil(totalItems / limit);

  // Lọc dữ liệu dựa trên bộ lọc từ SearchSlice
  useEffect(() => {
    fetchProjects(filterProject);
  }, [filterProject, fetchProjects]);

  // Phân trang
  const paginatedProjects = projects.slice(
    (page - 1) * limit,
    page * limit
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0 });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <HStack spacing={2} justify="center" mt={6} flexWrap="wrap">
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Trang trước"
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1}
        />
        {pagesToShow.map((p) => (
          <Button
            key={p}
            onClick={() => handlePageChange(p)}
            colorScheme={p === page ? 'blue' : 'gray'}
            size="sm"
          >
            {p}
          </Button>
        ))}
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Trang sau"
          onClick={() => handlePageChange(page + 1)}
          isDisabled={page === totalPages}
        />
      </HStack>
    );
  };

  return (
    <Box bg="gray.100" minH="100vh">
      <Container maxW="1000px" p={0}>
        <Flex p={6} gap={6} direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column" gap={6} flex="1">
            <ProjectFilter />
            <Grid templateColumns="1fr" gap={6}>
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((project) => (
                  <ProjectCard
                    {...project}
                  />
                ))
              ) : (
                <Text>Không có bất động sản nào phù hợp.</Text>
              )}
            </Grid>

            {/* Custom Pagination */}
            {renderPagination()}
            <FAQSection />
          </Flex>
          <Box width={{ base: '100%', md: '300px' }}>
            <AreaSidebar />
          </Box>    
        </Flex>
      </Container>
    </Box>
  );
};

export default ProjectSection;
