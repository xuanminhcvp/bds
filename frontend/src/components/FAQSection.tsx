import { VStack, Text, Link, Icon, HStack, Accordion } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp, FaPlus, FaMinus } from "react-icons/fa";
import { faqs } from "../mocks/data.ts";
import { useState } from "react";

export default function FAQSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);
  const initialDisplayCount = 5;
  const displayedFAQs = isExpanded ? faqs : faqs.slice(0, initialDisplayCount);

  return (
    <VStack align="start" gap={2} p={4} bg="gray.50" borderRadius="md" w="500px" mt={10}>
      <Text fontWeight="bold" fontSize="lg">Các câu hỏi thường gặp</Text>
      <Accordion.Root
        value={openFAQs}
        onValueChange={(e) => setOpenFAQs(e.value)}
        multiple
        collapsible
      >
        {displayedFAQs.map((faq) => (
          <Accordion.Item key={faq.id} value={`faq-${faq.id}`}>
            <Accordion.ItemTrigger>
              <HStack gap={2} align="start">
                <Icon
                  as={openFAQs.includes(`faq-${faq.id}`) ? FaMinus : FaPlus}
                  color="red.500"
                  boxSize={3}
                  mt={1}
                />
                <Text flex="1" fontSize="sm" color="gray.700">{faq.question}</Text>
              </HStack>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                <Text fontSize="sm" color="gray.600" mt={2} pl={5}>{faq.answer}</Text>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
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