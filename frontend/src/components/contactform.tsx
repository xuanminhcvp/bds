import React, { useState } from "react";
import {
    Box,
    Input,
    Textarea,
    Button,
    FormControl,
    FormLable,
    FormHelperText,
    useToast,
    Stack,
    VStack,
} from "@chakra-ui/react";

const ContactForm: React.FC = () => {

    const [formData, setFormData] = useState({
        fullName: "Nguyen Van A",
        phoneNumber: "0123456789",
        message: "Toi muon hoi ve can ho",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: "Sent",
                description: "contact back again",
                status: "success",
                duration: 5000,
                isCloseable: true,
            });
            setFormData({
                fullName: "",
                phoneNumber: "",
                message: "",
            });
        }, 2000);
    };

    return (
        <Box
            p={6}
            maxW={"500px"}
            mx={"auto"}
            bg={"gray.100"}
            borderRadius={"md"}
            boxShadow={"md"}
        >
            <form onSubmit={handleSubmit}>
                <VStack gap={4}>
                    <FormControl id="fullName" isRequired>
                        <FormLable>Ho ten</FormLable>
                        <Input 
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Nhap ho ten"
                        />
                        <FormHelperText>Nhap ho ten day du cua ban</FormHelperText>
                    </FormControl>
                    <FormControl id="phoneNumber" isRequired>
                        <FormLable>So dien thoai</FormLable>
                        <Input 
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Nhap so dien thoai"
                        />
                    </FormControl>
                    <FormControl id="message" isRequired>
                        <FormLable>Noi dung lien he</FormLable>
                        <Textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleTextareaChange}
                            placeholder="Nhap noi dung lien he"
                            size={"md"}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme={"teal"}
                        loading={isSubmitting}
                        loadingText="dang gui..."
                    >
                        Gui yeu cau
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default ContactForm;