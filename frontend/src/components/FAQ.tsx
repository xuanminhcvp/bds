import {
    Accordion,
    Container,
    Heading,
    Span,
} from '@chakra-ui/react';
import React from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ: React.FC = () => {
    const faqData: FAQItem[] = [
        {
            question: 'Lam the nao de dang ky xem nha?',
            answer: 'Ban co the dang ky xem nha bang cach dien vao form lien he',
        },
        {
            question: 'Chi phi dich vu la bao nhieu',
            answer: 'Chi phi dich vu phu thuoc vao loai bat dong san va yeu cau cua ban. Vui long lien he de duoc bao gia chi tiet',
        },
        {
            question: 'Tôi có cần đặt cọc trước khi mua không?',
            answer: 'Thông thường, chúng tôi yêu cầu đặt cọc để đảm bảo giao dịch. Số tiền đặt cọc sẽ được thỏa thuận trong hợp đồng và hoàn lại nếu giao dịch không thành công.',
        },
        {
            question: 'Thời gian xử lý hồ sơ mua nhà là bao lâu?',
            answer:
                'Thời gian xử lý hồ sơ thường từ 7-14 ngày làm việc, tùy thuộc vào loại bất động sản và thủ tục pháp lý liên quan.',
        },
    ];

    return (
        <Container maxW={"container.lg"} py={10}>
            <Heading as={"h2"} size={"xl"} textAlign={"center"} mb={8}>
                Cau hoi thuong gap
            </Heading>
            <Accordion.Root>
                {faqData.map((item, index) => (
                    <Accordion.Item key={index} value={item.answer}>
                        <Accordion.ItemTrigger>
                            <Span flex={"1"}>{item.answer}</Span>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>{item.question}</Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </Container>
    )
};

export default FAQ;