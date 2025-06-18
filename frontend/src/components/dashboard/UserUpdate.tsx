import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Image,
  Heading,
  InputGroup,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, EditIcon } from '@chakra-ui/icons';
import useRealEstateStore from '../../stores';
import { toast } from 'sonner';
import { uploadImages } from '../../utils/uploadImages';

interface UserUpdateData {
  name?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  avatar?: string;
}

const UserUpdate: React.FC = () => {
  const { user, updateUserProfile } = useRealEstateStore();
  const [formData, setFormData] = useState<UserUpdateData>({
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    avatar: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
  });
  const toggleEdit = (field: 'name' | 'phone') => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const imageUrl = await uploadImages([file]);
        setFormData((prev) => ({
          ...prev,
          avatar: imageUrl[0],
        }));
      } catch (error) {
        toast.error('Không thể tải lên ảnh. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Mật khẩu và xác nhận mật khẩu không khớp.');
        return;
      }
      const updateData: UserUpdateData = Object.fromEntries(
        Object.entries(formData).filter(
          ([key, value]) => key !== 'confirmPassword' && value !== ''
        )
      );

      const response = await updateUserProfile(updateData);
      if (response.success) {
        toast.success('Thông tin người dùng đã được cập nhật.'),
          setFormData({
            password: '',
            confirmPassword: '',
          });
      }
    } catch (error) {
      toast.error('Không thể cập nhật thông tin. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={{ base: 4, md: 6 }}>
      <Heading as="h1" size="lg" mb={6} textAlign="left">
        Cập nhật thông tin người dùng
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <Box position="relative" w="120px" h="120px">
              <Image
                src={
                  formData.avatar ||
                  (user && user.avatar) ||
                  'http://localhost:8000/assets/property/Screenshot_1.png'
                }
                alt="Avatar"
                borderRadius="full"
                objectFit="cover"
                w="100%"
                h="100%"
              />
              <IconButton
                aria-label="Chọn ảnh"
                icon={<EditIcon />}
                size="sm"
                position="absolute"
                bottom={0}
                right={0}
                bg="blue.500"
                color="white"
                borderRadius="full"
                _hover={{ bg: 'blue.600' }}
                onClick={() => document.getElementById('fileInput')?.click()}
              ></IconButton>
              <Input
                id="fileInput"
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>Họ và tên</FormLabel>
            <HStack>
              {editMode.name ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  autoFocus
                />
              ) : (
                <Box
                  p={2}
                  px={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  minW="2x"
                  fontSize="md"
                >
                  {formData.name || (user && user.name) || 'Chưa có name'}
                </Box>
              )}
              <IconButton
                aria-label="Chỉnh sửa tên"
                icon={<EditIcon />}
                size="sm"
                onClick={() => toggleEdit('name')}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Số điện thoại</FormLabel>
            <HStack>
              {editMode.phone ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  autoFocus
                />
              ) : (
                <Box
                  p={2}
                  px={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  fontSize="md"
                >
                  {formData.phone ||
                    (user && user.phone) ||
                    'Chưa có số điện thoại'}
                </Box>
              )}
              <IconButton
                aria-label="Chỉnh sửa số điện thoại"
                icon={<EditIcon />}
                size="sm"
                onClick={() => toggleEdit('phone')}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Mật khẩu</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Xác nhận mật khẩu</FormLabel>
            <InputGroup>
              <Input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu mới"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isLoading}
            loadingText="Đang cập nhật"
            isDisabled={
              !editMode.name &&
              !editMode.phone &&
              !formData.password &&
              !formData.avatar
            }
          >
            Cập nhật
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserUpdate;
