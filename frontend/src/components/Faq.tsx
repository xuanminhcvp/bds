import {
  VStack,
  Text,
  Link,
  Icon,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp, FaPlus, FaMinus } from 'react-icons/fa';
import { faqs } from '../mocks/data.ts';
import { useState } from 'react';

export default function FAQSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFAQIndices, setOpenFAQIndices] = useState<number[]>([]);
  const initialDisplayCount = 5;
  const displayedFAQs = isExpanded ? faqs : faqs.slice(0, initialDisplayCount);

  return (
    <VStack align="start" gap={2} p={4} bg="gray.50" borderRadius="md" mt={10}>
      <Text fontWeight="bold" fontSize="lg">
        Các câu hỏi thường gặp
      </Text>
      <Accordion
        allowMultiple
        allowToggle
        index={openFAQIndices}
        onChange={(newIndices) => setOpenFAQIndices(newIndices as number[])}
        w={"full"}
      >
        {displayedFAQs.map((faq, idx) => (
          <AccordionItem key={faq.id}>
            <AccordionButton >
              <HStack gap={2} align="start" flex="1">
                <Icon
                  as={openFAQIndices.includes(idx) ? FaMinus : FaPlus}
                  color="red.500"
                  boxSize={3}
                  mt={1}
                />
                <Text flex="1" fontSize="sm" color="gray.700">
                  {faq.question}
                </Text>
              </HStack>
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color="gray.600" mt={2} pl={5}>
                {faq.answer}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      {faqs.length > initialDisplayCount && (
        <Link
          color="red.500"
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap={1}
          onClick={() => setIsExpanded(!isExpanded)}
          cursor="pointer"
        >
          {isExpanded ? (
            <>
              Thu gọn <Icon as={FaChevronUp} />
            </>
          ) : (
            <>
              Xem thêm <Icon as={FaChevronDown} />
            </>
          )}
        </Link>
      )}
    </VStack>
  );
}
