import { useState } from "react";
import { Button, Icon, HStack, Text } from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";

interface PhoneRevealProps {
  phoneNumber: string;
}

export default function PhoneReveal({ phoneNumber }: PhoneRevealProps) {
  const [showFull, setShowFull] = useState(false);

  const formatPhone = (phone: string) => {
    if (showFull) {
      return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
    } else {
      return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ***`;
    }
  };

  return (
    <Button
      onClick={() => setShowFull(!showFull)}
      colorScheme="teal"
      size="sm"
      borderRadius="full"
    >
      <HStack gap={1}>
        <Icon as={FaPhoneAlt} />
        <Text fontWeight="bold">{formatPhone(phoneNumber)}</Text>
        <Text>· {showFull ? "Ẩn số" : "Hiện số"}</Text>
      </HStack>
    </Button>
  );
}
