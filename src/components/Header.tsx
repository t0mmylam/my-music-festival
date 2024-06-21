import React, { useState } from "react";
import { Box, Flex, Button, Text, Link, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

interface HeaderProps {
  token: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ token, onLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box width="100%" bg="gray.800" p={4} color="white" boxShadow="md">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex align="center">
          <Button as={RouterLink} to="/" colorScheme="teal" variant="ghost">
            Home
          </Button>
          <Button colorScheme="teal" variant="ghost" onClick={onOpen}>
            Info
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
        {token && (
          <Button colorScheme="red" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
