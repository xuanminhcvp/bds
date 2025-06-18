import { Box, Image, Heading, Text, Stack, Badge, Avatar, HStack, Divider } from '@chakra-ui/react';
import { ProjectResponse } from 'frontend/src/types/project';
import {
  FiMapPin,
  FiMaximize2,
  FiBriefcase,
  FiCalendar,
  FiUser,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard( project : ProjectResponse ) {
  const navigate = useNavigate();
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      shadow="sm"
      _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
      transition="all 0.2s ease-in-out"
      cursor="pointer"
    >
      <Image
        src={project.images?.[0] || '/no-image.jpg'}
        alt={project.title}
        w="100%"
        h="180px"
        objectFit="cover"
        onClick={() => navigate(`/project/${project.project_id}`) }
      />

      <Stack spacing={3} p={4}>
        <Heading as="h3" size="md" noOfLines={2} onClick={() => navigate(`/project/${project.project_id}`)}>
          {project.title}
        </Heading>

        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {project.description}
        </Text>

        <Stack spacing={1} fontSize="sm" color="gray.500">
          <HStack spacing={4}>
            <HStack>
              <FiMapPin />
              <Text>{project.address}</Text>
            </HStack>
            
            <HStack>
              <FiMaximize2 />
              <Text>{project.area} m²</Text>
            </HStack>
          </HStack>
          <HStack spacing={4}>
            <HStack>
              <FiBriefcase />
              <Text>{project.company}</Text>
            </HStack>
            <HStack>
              <FiCalendar />
              <Text fontSize="xs" color="gray.400">
                {new Date(project.created_at).toLocaleDateString()}
              </Text>
            </HStack>
          </HStack>
          <HStack mt={2}>
              <Badge colorScheme={project.status === 'ongoing' ? 'red' : 'green'}  px={2}>
                {project.status === 'ongoing' ? 'Đang thi công' : 'Đã hoàn thành' }
              </Badge>
          </HStack>
        </Stack>

        <Divider />

        <HStack spacing={2} pt={2}>
          <Avatar size="sm" src={project.user.avatar} name={project.user.name} />
          <HStack spacing={1} fontSize="sm" color="gray.700">
            <FiUser />
            <Text>{project.user.name}</Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};

