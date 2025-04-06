import React, { useState } from 'react';
import {
    Box, 
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Heading,
    Text,
    InputGroup,
    InputRightElement,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast({
                title: 'Dang nhap thanh cong',
                status: 'success',
                duration: 3000,
                isCloseable: true,
            });
        } catch (error) {
            toast ({
                title: 'Loi dang nhap',
                description: 'Vui long kiem tra lai thong tin',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box 
            maxW={"md"}
            mx={"auto"}
            mt={"8"}
            p={"6"}
            borderWidth={"1"}
            borderRadius={"8"}
            boxShadow={"lg"}        
        >
            <Heading mb={"6"}>Dang nhap</Heading>
            <form onSubmit={handleSubmit}>
                <VStack gap={"4"}>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type="email"
                            value={"email"}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhap email cua ban"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Mat khau</FormLabel>
                        <InputGroup>
                            <Box display="flex" width="100%">
                                <Input 
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhap mat khau"
                                />
                                <InputRightElement>
                                    <Button
                                        h={"1.75rem"}
                                        size={"sm"}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </Box>
                        </InputGroup>
                    </FormControl>

                    <Button
                        colorScheme={"blue"}
                        type={"submit"}
                        loading={isLoading}
                        loadingText="Dang dang nhap"
                    >
                        Dang nhap
                    </Button>

                    <Text textAlign="center" fontSize="sm" color="gray.600">
                        Quên mật khẩu?{' '}
                        <Button variant="ghost" colorScheme="blue" size="sm">
                        Khôi phục
                        </Button>
                    </Text>
                </VStack>
            </form>
        </Box>
    );
};

export default LoginForm;
