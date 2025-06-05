import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { SIDEBAR_ITEMS } from "../../data/sidebarItems";

function renderSidebarItems(items: any[], navigate: any, onClose?: any) {
  return items.map((item, idx) => (
    <VStack key={idx} align="start" w="full" spacing={item.children ? 2 : 0}>
      <Button
        leftIcon={item.icon ? <item.icon /> : undefined}
        variant="ghost"
        w="full"
        justifyContent="start"
        onClick={() => item.onClick(navigate, undefined, onClose)} // bỏ setPostFilters
      >
        {item.label}
      </Button>
      {item.children && (
        <VStack pl={6} spacing={2} w="full">
          {renderSidebarItems(item.children, navigate, onClose)}
        </VStack>
      )}
    </VStack>
  ));
}

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        aria-label="Mở menu"
        icon={<FaBars />}
        onClick={onOpen}
        display={{ base: "block", md: "none" }}
        position="fixed"
        top={4}
        left={4}
        zIndex={10}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tổng quan</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {renderSidebarItems(SIDEBAR_ITEMS, navigate, onClose)}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box
        bg="white"
        boxShadow="md"
        h="100vh"
        w="64"
        display={{ base: "none", md: "block" }}
      >
        <VStack align="start" p={4} spacing={4}>
          <Heading size="md">Tổng quan</Heading>
          {renderSidebarItems(SIDEBAR_ITEMS, navigate)}
        </VStack>
      </Box>
    </>
  );
};

export default Sidebar;
