// File: TaskDashboard.tsx
import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  IconButton,
  defaultSystem,
} from '@chakra-ui/react';

// Interface cho dữ liệu công việc
interface Task {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high';
  progress: number; 
  completed: boolean;
}

// Dữ liệu mẫu
const tasks: Task[] = [
  { id: 1, title: 'Thiết kế UI', priority: 'high', progress: 80, completed: false },
  { id: 2, title: 'Viết API', priority: 'medium', progress: 50, completed: false },
  { id: 3, title: 'Kiểm tra lỗi', priority: 'low', progress: 100, completed: true },
];

// Component hiển thị một công việc
const TaskItem: React.FC<Task> = ({ title, priority, progress, completed }) => {
  // Xác định màu sắc dựa trên mức độ ưu tiên
  const priorityColor = {
    low: 'green',
    medium: 'yellow',
    high: 'red',
  };

  return (
    <Box
      w="full"
      p={4}
      bgGradient="linear(to-r, gray.50, white)" // Gradient nền
      borderRadius="lg"
      boxShadow="base"
      _hover={{ boxShadow: 'lg', bgGradient: 'linear(to-r, gray.100, white)' }}
      transition="all 0.3s"
    >
      <HStack justify="space-between" align="center">
        <VStack align="start" gap={1}>
          <HStack>
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              {title}
            </Text>
            <Badge colorScheme={priorityColor[priority]} variant="solid">
              {priority.toUpperCase()}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            {completed ? 'Hoàn thành' : `${progress}% đang thực hiện`}
          </Text>
        </VStack>
        <IconButton
          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
          colorScheme={completed ? 'red' : 'green'}
          size="sm"
          variant="ghost"
        />
      </HStack>
    </Box>
  );
};

// Component chính
const TaskDashboard: React.FC = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Box
        minH="100vh"
        p={8}
        bg="black"
      >
        <Heading
          mb={8}
          textAlign="center"
          color="white"
          textShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
        >
          Bảng điều khiển công việc
        </Heading>
        <Box maxW="800px" mx="auto" bg="white" borderRadius="xl" p={6} boxShadow="xl">
            <VStack gap={4} align="stretch">
                {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    priority={task.priority}
                    progress={task.progress}
                    completed={task.completed}
                />
                ))}
            </VStack>
          <Text textAlign="center" color="gray.600">
            Tổng cộng: {tasks.length} công việc
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default TaskDashboard;