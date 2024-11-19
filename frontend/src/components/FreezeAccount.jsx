import {
  Box,
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useLogout from "../hooks/useLogout";

const FreezeAccount = () => {
  const [updating, setUpdating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const logout = useLogout();

  const handleFreezeAccount = async () => {
    setUpdating(true);
    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      // Clear user state and redirect to login
      setUser(null);

      if (data.success) {
        await logout();
        localStorage.clear();
        showToast("Success", "Account frozen successfully", "success");
      }
      navigate("/auth");
    } catch (error) {
      showToast("Error", "Something went wrong", "error");
    } finally {
      setUpdating(false);
      onClose();
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Box
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.dark")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={12}
      >
        <Button
          bg={useColorModeValue("gray.600", "gray.700")}
          color={"white"}
          w="full"
          _hover={{
            bg: useColorModeValue("gray.700", "gray.800"),
          }}
          onClick={onOpen}
        >
          Freeze Account
        </Button>
      </Box>

      {isOpen && (
        <Box
          onClick={onClose}
          backdropFilter="auto"
          position={"fixed"}
          top={0}
          right={0}
          left={0}
          bottom={0}
          zIndex={40}
          backdropBlur="5px"
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bg={useColorModeValue("white", "gray.dark")}>
          <ModalHeader textAlign={"center"}>Freeze Account</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <Text
                fontSize="md"
                my={4}
                textAlign={"center"}
                fontWeight="bold"
                color="red.500"
              >
                Are you sure you want to freeze your account?
              </Text>

              <Text fontSize="sm" my={4} textAlign={"center"} color="gray.500">
                You can unfreeze anytime by logging in to your account
              </Text>

              <Flex
                direction="row"
                align="center"
                justify="center"
                mt={4}
                gap={3}
              >
                <Button onClick={onClose} variant="ghost">
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleFreezeAccount}
                  isLoading={updating}
                >
                  Confirm Freeze
                </Button>
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default FreezeAccount;
