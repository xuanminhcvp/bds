import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  HStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmailIcon } from '@chakra-ui/icons';
import axios from 'axios';

interface NewsletterFormData {
  email: string;
}

const NewsletterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/v1/newsletter/subscribe', {
        email: data.email,
      });
      console.log('Email submitted:', data.email);
      toast.success('Đăng ký nhận tin thành công!');
      reset();
    } catch (error) {
      toast.error('Đăng ký nhận tin thất bại. Vui lòng thử lại sau.');
      }
  };

  return (
    <Box maxW="sm" mx="auto" p={4} bg="white" borderRadius="lg" boxShadow="sm">
      <FormLabel fontSize="lg" fontWeight="bold" mb={2} textAlign="center"> 
        Đăng ký nhận tin tức
      </FormLabel>
      <HStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={3}
        align="center"
        justify="center"
      >
        <FormControl isInvalid={!!errors.email} maxW="xs">
          <FormLabel htmlFor="email" srOnly>
            Email
          </FormLabel>
          <InputGroup>
            <Input
              id="email"
              placeholder="Nhập email nhận tin"
              size="md"
              variant="filled"
              focusBorderColor="teal.500"
              {...register('email', {
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email không hợp lệ',
                },
              })}
            />
            <InputRightElement width="2.5rem">
              <Button
                type="submit"
                size="sm"
                colorScheme="teal"
                isLoading={isSubmitting}
                aria-label="Đăng ký nhận tin"
                variant="ghost"
                p={0}
                h="1.75rem"
              >
                <EmailIcon boxSize={5} />
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="xs" mt={1}>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>
    </Box>
  );
};

export default NewsletterForm;