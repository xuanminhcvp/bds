import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  Heading,
  SimpleGrid,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { IoIosRemove } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useRealEstateStore from '../../stores';
import { uploadImages } from '../../utils/uploadImages';
import { ProjectCreate } from 'frontend/src/types/project';

export const projectStatus = [
  { label: 'Đang thực hiện', value: 'ongoing' },
  { label: 'Hoàn thành', value: 'completed' },
];

const CreateProjectPage = () => {
  const { createProject, isLoadingProjects, errorProjects } = useRealEstateStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectCreate>({
    title: '',
    description: '',
    area: 0,
    address: '',
    status: '', 
    images: [],
    company: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'area' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imagePaths = await uploadImages(images);
      const projectData: ProjectCreate = {
        ...formData,
        images: imagePaths,
      };
      await createProject(projectData);
      toast.success('Dự án đã được tạo thành công.');
      navigate('/userproject');
    } catch (error) {
      toast.error(errorProjects || 'Có lỗi khi tạo dự án.');
    }
  };

  return (
    <Box p={6} maxW="2xl" mx="auto" overflowY="auto" maxHeight="80vh" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <VStack gap={6} align="stretch">
        <Heading as="h1" size="lg">Tạo dự án mới</Heading>
        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            {/* Tiêu đề */}
            <FormControl isRequired>
              <FormLabel>Tiêu đề</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề dự án"
              />
            </FormControl>

            {/* Mô tả */}
            <FormControl isRequired>
              <FormLabel>Mô tả</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả chi tiết"
              />
            </FormControl>

            {/* Diện tích */}
            <FormControl isRequired isInvalid={formData.area > 0 && formData.area <= 0}>
              <FormLabel>Diện tích (m²)</FormLabel>
              <Input
                name="area"
                type="number"
                step="1"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Nhập diện tích"
              />
              <FormErrorMessage>Diện tích phải lớn hơn 0.</FormErrorMessage>
            </FormControl>

            {/* Địa chỉ */}
            <FormControl isRequired isInvalid={formData.address.length > 0 && formData.address.length < 10}>
              <FormLabel>Địa chỉ</FormLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ"
              />
              <FormErrorMessage>Địa chỉ phải có ít nhất 10 ký tự.</FormErrorMessage>
            </FormControl>

            {/* Trạng thái */}
            <FormControl isRequired>
              <FormLabel>Trạng thái</FormLabel>
              <Select
                size="sm"
                width="320px"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                placeholder="Chọn trạng thái"
              >
                {projectStatus.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Công ty */}
            <FormControl>
              <FormLabel>Công ty</FormLabel>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Nhập tên công ty"
              />
            </FormControl>

            {/* Upload hình ảnh */}
            <FormControl isRequired>
              <FormLabel>Hình ảnh</FormLabel>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                p={1}
              />
              {imagePreviews.length > 0 && (
                <SimpleGrid columns={{ base: 2, md: 5 }} gap={4} mt={4}>
                  {imagePreviews.map((preview, index) => (
                    <Box key={index} position="relative">
                      <Image
                        src={preview}
                        alt={`Preview ${index}`}
                        boxSize="100px"
                        objectFit="cover"
                      />
                      <IconButton
                        aria-label="Xóa hình ảnh"
                        size="sm"
                        colorScheme="red"
                        position="absolute"
                        top="0"
                        right="0"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <IoIosRemove />
                      </IconButton>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </FormControl>

            {/* Nút submit */}
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              mt={4}
              isLoading={isLoadingProjects}
              disabled={isLoadingProjects}
            >
              Tạo dự án
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default CreateProjectPage;