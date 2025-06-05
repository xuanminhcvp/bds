import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { IoIosRemove } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PostFormData, propertyType, categories } from "./postnewType";
import useRealEstateStore from "../../stores";
import { uploadImages } from "./uploadImages";

const PostNew: React.FC = () => {
  const { addProperty, isLoadingProperty, errorProperty } = useRealEstateStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    description: '',
    price: 0,
    area: 0,
    address: '',
    bedrooms: 0,
    bathrooms: 0,
    property_type: '',
    category: '',
    images: [],
  });
  const [ images, setImages] = useState<File[]>([]);
  const [ imagePreviews, setImagePreviews ] = useState<String[]>([])

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { name: string, value: string } ) => {
      const name = 'target' in e ? e.target.name : e.name;
      const value = 'target' in e ? ( name === "price" || name === "area" || name === "bedrooms" || name === "bathrooms" ? Number(e.target.value) : e.target.value ) : e.value;
      setFormData(prev => ({
          ...prev,
          [name]: value
      }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if ( files.length > 0 ) {
        setImages(prev => [...prev, ...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
      }
  };

  const handleRemoveImage = ( index: number ) => {
    setImages(prev => prev.filter((_,i) => i !== index));
    setImagePreviews(prev => prev.filter((_,i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_,i) => i !== index)
    }))
  };

  const handleSubmit = async ( e: React.FormEvent) => {
    e.preventDefault();
    try {
        const imagePaths = await uploadImages(images);
        const propertyCreateData: PostFormData = {
          ...formData,
          images: imagePaths,
        };
        const result = await addProperty(propertyCreateData);
        if ( result.success ) {
            toast.success('Tin đăng đã được gửi để duyệt.');
            navigate('/manage-posts');
        } else {
          throw new Error(result.error)
        }
    } catch (error) {
          toast.error(errorProperty);
    };
  }
  return (
    <Box p={6} maxW="2xl" mx="auto">
      <VStack gap={6} align="stretch">
        <Heading as="h1" size="lg">
          Đăng tin mới
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            {/* Tiêu đề */}
            <FormControl isRequired>
              <FormLabel>Tiêu đề</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề tin đăng"
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

            {/* Giá */}
            <FormControl isRequired isInvalid={formData.price > 0 && formData.price <= 0}>
              <FormLabel>Giá (VND )</FormLabel>
              <Input
                name="price"
                type="number"
                step="10"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Nhập giá"
              />
              <FormErrorMessage>
                Giá phải lớn hơn 0.
              </FormErrorMessage>
            </FormControl>

            {/* Diện tích */}
            <FormControl isRequired isInvalid={formData.area > 0 && formData.area <= 0}>
              <FormLabel>Diện tích (m²)</FormLabel>
              <Input
                name="area"
                type="number"
                step="10"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Nhập diện tích"
              />
              <FormErrorMessage>
                Diện tích phải lớn hơn 0.
              </FormErrorMessage>
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
              <FormErrorMessage>
                Địa chỉ phải có ít nhất 10 ký tự.
              </FormErrorMessage>
            </FormControl>

            {/* Số phòng ngủ */}
            <FormControl isRequired isInvalid={formData.bedrooms > 0 && formData.bedrooms <= 0}>
              <FormLabel>Số phòng ngủ</FormLabel>
              <Input
                name="bedrooms"
                type="number"
                step="1"
                value={formData.bedrooms}
                onChange={handleInputChange}
                placeholder="Nhập số phòng ngủ"
              />
              <FormErrorMessage>
                Số phòng ngủ phải lớn hơn 0.
              </FormErrorMessage>
            </FormControl>

            {/* Số phòng tắm */}
            <FormControl isRequired isInvalid={formData.bathrooms > 0 && formData.bathrooms <= 0}>
              <FormLabel>Số phòng tắm</FormLabel>
              <Input
                name="bathrooms"
                type="number"
                step="1"
                value={formData.bathrooms}
                onChange={handleInputChange}
                placeholder="Nhập số phòng tắm"
              />
              <FormErrorMessage>
                Số phòng tắm phải lớn hơn 0.
              </FormErrorMessage>
            </FormControl>

            {/* Loại bất động sản */}
            <FormControl isRequired>
              <FormLabel>Loại bất động sản</FormLabel>
              <Select
                size="sm"
                width="320px"
                name="property_type"
                value={formData.property_type}
                onChange={handleInputChange}
                placeholder='Select'
              >
                {propertyType.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Danh mục */}
            <FormControl isRequired>
              <FormLabel>Danh mục</FormLabel>
              <Select
                size="sm"
                width="320px"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder='Select'
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
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
              {/* Hiển thị preview hình ảnh */}   
              {imagePreviews.length > 0 && (
                <SimpleGrid columns={{ base: 2, md: 5 }} gap={4} mt={4}>
                  {imagePreviews.map((preview, index) => (
                    <Box key={index} position="relative">
                      <Image src={preview as string} alt={`Preview ${index}`} boxSize="100px" objectFit="cover" />
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
              isLoading={isLoadingProperty}
              disabled={isLoadingProperty}
            >
              Đăng tin
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};
export default PostNew;